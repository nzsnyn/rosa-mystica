"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import LocalImageUploader from "@/components/LocalImageUploader";

interface FormData {
  title: string;
  description: string;
  content: string;
  excerpt: string;
  published: boolean;
}

interface UploadedImage {
  id: string;
  path: string;
  filename: string;
}

function CreateContentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentType = searchParams.get("type") as "IMAGE" | "ARTICLE" | null;
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    content: "",
    excerpt: "",
    published: false,
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  useEffect(() => {
    if (!contentType || !["IMAGE", "ARTICLE"].includes(contentType)) {
      router.push("/admin/content");
    }
  }, [contentType, router]);

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
      const maxSize = 1 * 1024 * 1024;
      
      if (selectedFile.size > maxSize) {
        alert(`Ukuran file harus kurang dari 1MB. File yang dipilih berukuran ${(selectedFile.size / 1024 / 1024).toFixed(2)}MB`);
        e.target.value = '';
        setFile(null);
        setPreviewUrl(null);
        return;
      }
      
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
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
    setLoading(true);

    try {
      if (contentType === "IMAGE") {
        if (!file) {
          alert("Silakan pilih file gambar");
          setLoading(false);
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("file", file);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("type", "IMAGE");
        formDataToSend.append("published", formData.published.toString());

        const response = await fetch("/api/content", {
          method: "POST",
          body: formDataToSend,
        });

        if (!response.ok) throw new Error("Failed to upload image");
      } else {
        const response = await fetch("/api/content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            type: "ARTICLE",
          }),
        });

        if (!response.ok) throw new Error("Failed to create article");
      }

      router.push(`/admin/content?type=${contentType}`);
    } catch (error) {
      console.error("Error creating content:", error);
      alert(`Gagal membuat ${contentType === "IMAGE" ? "gambar" : "artikel"}`);
    } finally {
      setLoading(false);
    }
  };

  if (!contentType) return null;
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simple Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Panel Admin
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => router.push("/admin/content")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Manajemen Konten
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Buat {contentType === "IMAGE" ? "Gambar" : "Artikel"} Baru
          </h1>
          <p className="text-gray-600">
            {contentType === "IMAGE" 
              ? "Unggah dan kelola gambar untuk konten Anda menggunakan penyimpanan lokal" 
              : "Buat dan publikasikan artikel untuk situs web Anda"
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Judul *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder={`Masukkan judul ${contentType === "IMAGE" ? "gambar" : "artikel"}`}
            />
          </div>

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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder={`Masukkan deskripsi ${contentType === "IMAGE" ? "gambar" : "artikel"}`}
            />
          </div>

          {contentType === "IMAGE" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Gambar *
              </label>
              <div className="space-y-4">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Ukuran file maksimum: 1MB. Format yang didukung: JPG, PNG, WebP, GIF
                  </p>
                </div>

                {previewUrl && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau:</p>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <img
                          src={previewUrl}
                          alt="Pratinjau"
                          className="max-w-md max-h-64 rounded-lg shadow-sm object-contain"
                        />
                      </div>
                    </div>

                    {file && (
                      <div className="text-sm text-gray-600">
                        <p><strong>File:</strong> {file.name}</p>
                        <p><strong>Ukuran:</strong> {(file.size / 1024).toFixed(1)} KB</p>
                        <p><strong>Tipe:</strong> {file.type}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {contentType === "ARTICLE" && (
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  placeholder="Ringkasan singkat artikel"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Konten *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={10}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
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
              id="published"
              name="published"
              type="checkbox"
              checked={formData.published}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Publikasikan segera
            </label>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/admin/content")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading || (contentType === "IMAGE" && !file)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Membuat..." : `Buat ${contentType === "IMAGE" ? "Gambar" : "Artikel"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreateContentPage() {
  return (
    <AuthGuard>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat...</p>
          </div>
        </div>
      }>
        <CreateContentForm />
      </Suspense>
    </AuthGuard>
  );
}
