"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

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

const ContentManagement = () => {
  const [content, setContent] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("type");

  useEffect(() => {
    fetchContent();
  }, [typeFilter]);

  const fetchContent = async () => {
    try {
      const url = typeFilter ? `/api/content?type=${typeFilter}` : "/api/content";
      const response = await fetch(url);
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konten ini?")) return;

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContent(content.filter((item) => item.id !== id));
      } else {
        alert("Gagal menghapus konten");
      }
    } catch (error) {
      console.error("Failed to delete content:", error);
      alert("Gagal menghapus konten");
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const contentItem = content.find((item) => item.id === id);
      if (!contentItem) return;

      const response = await fetch(`/api/content/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contentItem,
          published: !published,
        }),
      });

      if (response.ok) {
        setContent(content.map((item) => 
          item.id === id ? { ...item, published: !published } : item
        ));
      } else {
        alert("Gagal memperbarui status konten");
      }
    } catch (error) {
      console.error("Failed to update content status:", error);
      alert("Gagal memperbarui status konten");
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getPageTitle = () => {
    if (typeFilter === "IMAGE") return "Gambar";
    if (typeFilter === "ARTICLE") return "Artikel";
    return "Semua Konten";
  };

  const getCreateButton = () => {
    if (typeFilter === "IMAGE") {      return (
        <Link
          href="/admin/content/create?type=IMAGE"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Unggah Gambar Baru
        </Link>
      );
    }
    if (typeFilter === "ARTICLE") {
      return (        <Link
          href="/admin/content/create?type=ARTICLE"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Buat Artikel Baru
        </Link>
      );
    }
    return (
      <div className="flex space-x-2">
        <Link          href="/admin/content/create?type=IMAGE"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Unggah Gambar
        </Link>
        <Link
          href="/admin/content/create?type=ARTICLE"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Buat Artikel
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="px-4 py-6">
          <div className="animate-pulse">Memuat konten...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <div className="flex space-x-2 mt-2">
              <Link
                href="/admin/content"
                className={`px-3 py-1 rounded text-sm ${
                  !typeFilter ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Semua
              </Link>
              <Link
                href="/admin/content?type=IMAGE"
                className={`px-3 py-1 rounded text-sm ${
                  typeFilter === "IMAGE" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Gambar
              </Link>
              <Link
                href="/admin/content?type=ARTICLE"
                className={`px-3 py-1 rounded text-sm ${
                  typeFilter === "ARTICLE" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Artikel
              </Link>
            </div>
          </div>
          {getCreateButton()}
        </div>

        {content.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Tidak ada konten ditemukan</div>
            {getCreateButton()}
          </div>
        ) : (
          <div className="space-y-4">
            {content.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {item.type === "IMAGE" && item.path && (
                      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.path}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.title}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.type === "IMAGE"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.type}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.published ? "Dipublikasi" : "Draf"}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      {item.excerpt && (
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                      <div className="text-xs text-gray-400">
                        {item.type === "IMAGE" && item.size && (
                          <span className="mr-4">{formatFileSize(item.size)}</span>
                        )}
                        Dibuat: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => togglePublished(item.id, item.published)}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        item.published
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-green-200 text-green-700 hover:bg-green-300"
                      }`}
                    >
                      {item.published ? "Batalkan Publikasi" : "Publikasi"}
                    </button>
                    <Link
                      href={`/admin/content/${item.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Ubah
                    </Link>
                    <button
                      onClick={() => deleteContent(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

const ContentPage = () => {
  return (
    <Suspense fallback={
      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat konten...</p>
          </div>
        </div>
      </AdminLayout>
    }>
      <ContentManagement />
    </Suspense>
  );
};

export default ContentPage;
