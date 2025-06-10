"use client";

import MainLayout from "@/components/layouts/MainLayout";
import Navbar from "@/components/navbar/Navbar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ContentType {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  description?: string;
  path?: string;
  published: boolean;
  createdAt: string;
  type: "IMAGE" | "ARTICLE";
}

const NewsDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  
  const [article, setArticle] = useState<ContentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/content/${id}`);
      if (response.ok) {
        const data = await response.json();
        // Only show if published and is an article
        if (data.published && data.type === "ARTICLE") {
          setArticle(data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch article:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <MainLayout>
          <div className="animate-pulse">Loading article...</div>
        </MainLayout>
      </div>
    );
  }
  if (!article) {
    return (
      <div>
        <Navbar />
        <MainLayout>
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">Artikel tidak ditemukan</div>
            <Link
              href="/news"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Kembali ke Berita
            </Link>
          </div>
        </MainLayout>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <MainLayout>
        <div>
          <Link
            href="/news"
            className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Kembali ke Berita
          </Link>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="text-sm text-gray-500 mb-4">
                {new Date(article.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {article.title}
              </h1>

              {/* Gambar utama di bawah judul */}
              {article.path && (
                <div className="relative h-64 md:h-96 mb-6">
                  <Image
                    src={article.path}
                    alt={article.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              
              {article.excerpt && (
                <div className="text-xl text-gray-600 mb-6 font-medium">
                  {article.excerpt}
                </div>
              )}
              
              {article.description && !article.excerpt && (
                <div className="text-xl text-gray-600 mb-6 font-medium">
                  {article.description}
                </div>
              )}
              
              {article.content && (
                <MarkdownRenderer content={article.content} />
              )}
            </div>
          </article>
        </div>
      </MainLayout>
    </div>
  );
};

export default NewsDetailPage;
