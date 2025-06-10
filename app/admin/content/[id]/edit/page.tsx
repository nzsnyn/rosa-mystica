"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import LocalImageUploader from "@/components/LocalImageUploader";

interface ContentType {
  id: string;
  title: string;
  description?: string;
  type: "IMAGE" | "ARTICLE";
  filename?: string;
  path?: string;
  size?: number;
  mimeType?: string;
  content?: string;
  excerpt?: string;
  published: boolean;
  createdAt: string;
}

interface UploadedImage {
  id: string;
  path: string;
  filename: string;
}

const EditContentPage = () => {
  const router = useRouter();
  const params = useParams();
  const contentId = params.id as string;

  const [content, setContent] = useState<ContentType | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    excerpt: "",
    published: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  useEffect(() => {
    fetchContent();
  }, [contentId]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content/${contentId}`);
      if (!response.ok) throw new Error("Content not found");
      
      const data = await response.json();
      setContent(data);
      setFormData({
        title: data.title || "",
        description: data.description || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        published: data.published || false,
      });
    } catch (error) {
      console.error("Failed to fetch content:", error);
      alert("Gagal memuat konten");
      router.push("/admin/content");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      
      if (selectedFile.size > maxSize) {
        alert(`Ukuran file harus kurang dari 1MB. File yang dipilih berukuran ${(selectedFile.size / 1024 / 1024).toFixed(2)}MB`);
        e.target.value = ''; // Clear the input
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleImageUploadComplete = (contentId: string, path: string, filename: string) => {
    const newImage: UploadedImage = {
      id: contentId,
      path: path,
      filename: filename
    };
    setUploadedImages(prev => [...prev, newImage]);
  };

  const insertImageToContent = (imagePath: string) => {
    const imageMarkdown = `![Gambar](${imagePath})`;
    setFormData(prev => ({
      ...prev,
      content: prev.content + '\n\n' + imageMarkdown
    }));
  };

  const removeUploadedImage = (imageId: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (content?.type === "IMAGE" && file) {
        // Handle image file update with new file
        const formDataToSend = new FormData();
        formDataToSend.append("file", file);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("type", "IMAGE");
        formDataToSend.append("published", formData.published.toString());
        formDataToSend.append("_method", "PUT"); // Indicate this is an update

        const response = await fetch(`/api/content/${contentId}`, {
          method: "PUT",
          body: formDataToSend,
        });

        if (!response.ok) throw new Error("Gagal memperbarui gambar");
      } else {
        // Handle text-only update (article or image metadata only)
        const response = await fetch(`/api/content/${contentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            type: content?.type,
          }),
        });

        if (!response.ok) throw new Error("Gagal memperbarui konten");
      }

      router.push(`/admin/content?type=${content?.type}`);
    } catch (error) {
      console.error("Error updating content:", error);
      alert(`Gagal memperbarui ${content?.type.toLowerCase()}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Memuat...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!content) {
    return (
      <AdminLayout>
        <div className="px-4 py-6">
          <div className="text-center text-red-600">Konten tidak ditemukan</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Ubah {content.type === "IMAGE" ? "Gambar" : "Artikel"}
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Judul
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {content.type === "IMAGE" && (
              <>
                {content.path && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gambar Saat Ini
                    </label>
                    <div className="mb-4">
                      <Image
                        src={content.path}
                        alt={content.title}
                        width={200}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                )}
                  <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    Ganti Gambar (opsional) <span className="text-gray-500">(Maks 1MB)</span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Biarkan kosong untuk mempertahankan gambar saat ini. Format yang didukung: JPG, PNG, GIF. Ukuran file maksimum: 1MB
                  </p>
                </div>
              </>
            )}

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {content.type === "ARTICLE" && (
              <>
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                    Ringkasan
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Deskripsi singkat untuk daftar artikel..."
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Konten
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={12}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tulis konten artikel Anda di sini..."
                  />
                </div>

                {/* Upload Gambar untuk Artikel */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Gambar untuk Artikel
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload gambar yang akan digunakan dalam artikel. Gambar akan otomatis ditambahkan ke konten artikel.
                  </p>
                  <LocalImageUploader 
                    onUploadComplete={handleImageUploadComplete}
                    className="mb-4"
                  />
                  
                  {/* Daftar gambar yang sudah diupload */}
                  {uploadedImages.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-700">Gambar yang telah diupload:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <img
                                  src={image.path}
                                  alt={image.filename}
                                  className="w-full h-32 object-cover rounded mb-2"
                                />
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {image.filename}
                                </p>
                                <p className="text-xs text-gray-500">{image.path}</p>
                              </div>
                              <div className="flex flex-col space-y-2 ml-4">
                                <button
                                  type="button"
                                  onClick={() => insertImageToContent(image.path)}
                                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  Insert ke Artikel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeUploadedImage(image.id)}
                                  className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                  Hapus
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                Dipublikasi
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : `Perbarui ${content.type === "IMAGE" ? "Gambar" : "Artikel"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

const EditContentPageWithAuth = () => {
  return (
    <AuthGuard>
      <EditContentPage />
    </AuthGuard>
  );
};

export default EditContentPageWithAuth;
