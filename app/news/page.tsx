"use client";

import MainLayout from "@/components/layouts/MainLayout";
import Navbar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
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

const NewsPage = () => {
  const [articles, setArticles] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/content?type=ARTICLE");
      const data = await response.json();
      // Only show published articles
      setArticles(data.filter((item: ContentType) => item.published));
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <MainLayout>
        <div>
          <h1 className="font-cormorant text-5xl font-bold mb-8">
            Berita & Artikel
          </h1>          {loading ? (
            <div className="animate-pulse">Loading articles...</div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">Belum ada artikel</div>
            </div>
          ) : (
            <div className="space-y-8">
              {articles.map((article: ContentType) => (
                <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    {article.path && (
                      <div className="md:w-1/3">
                        <div className="relative h-48 md:h-full">
                          <Image
                            src={article.path}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className={`p-6 ${article.path ? 'md:w-2/3' : 'w-full'}`}>
                      <div className="text-sm text-gray-500 mb-2">
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-gray-600 mb-4">
                          {article.excerpt}
                        </p>
                      )}
                      {article.description && !article.excerpt && (
                        <p className="text-gray-600 mb-4">
                          {article.description}
                        </p>
                      )}
                      <div className="text-gray-700 line-clamp-3">
                        {article.content ? article.content.substring(0, 300) : ''}
                        {article.content && article.content.length > 300 && '...'}
                      </div>
                      <Link
                        href={`/news/${article.id}`}
                        className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Baca selengkapnya →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default NewsPage;
