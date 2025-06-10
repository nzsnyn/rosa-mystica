import React, { useState, useEffect } from "react";
import Footer from "../navbar/Footer";
import Image from "next/image";
import Link from "next/link";
import { getFirstImageFromMarkdown } from "@/lib/markdown-utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface LatestNews {
  id: string;
  title: string;
  excerpt?: string;
  description?: string;
  content?: string;
  path?: string;
  createdAt: string;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const [latestNews, setLatestNews] = useState<LatestNews[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestNews();
    }, []);

    const fetchLatestNews = async () => {
        try {
            const response = await fetch('/api/content?type=ARTICLE&limit=5');
            if (response.ok) {
                const data = await response.json();
                // Filter only published articles and limit to 5
                const publishedNews = data
                    .filter((item: any) => item.published)
                    .slice(0, 5);
                setLatestNews(publishedNews);
            }
        } catch (error) {
            console.error('Failed to fetch latest news:', error);
        } finally {
            setLoading(false);
        }
    };

    const truncateText = (text: string, maxLength: number = 60) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };
    return (
        <div className='font-lora'>
            <div className='flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 px-4 sm:px-6 md:px-8 lg:px-12 mt-8 md:mt-12 lg:mt-16'>
                <div className='w-full lg:w-2/3 xl:w-3/4'>
                    {children}
                </div>

                <div className='w-full lg:w-1/3 xl:w-1/4 mt-8 lg:mt-0'>
                    <div className='w-full h-20 md:h-24 bg-slate-200 flex items-center justify-center'>
                        <h1 className='font-lora text-3xl md:text-4xl'>Berita Terbaru</h1>
                    </div>
                    
                    {loading ? (
                        // Loading state
                        Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className="flex gap-4 my-2 w-full animate-pulse">
                                <div className='w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 lg:w-28 lg:h-20 xl:w-32 xl:h-24 bg-gray-300 flex-shrink-0 rounded'></div>
                                <div className='flex-1 space-y-2'>
                                    <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                                    <div className='h-4 bg-gray-300 rounded w-1/2'></div>
                                </div>
                            </div>
                        ))
                    ) : latestNews.length > 0 ? (
                        // Actual news data
                        latestNews.map((news) => {
                            // Get image from main path or first image in markdown content
                            const displayImage = news.path || getFirstImageFromMarkdown(news.content || '');
                            
                            return (
                                <Link 
                                    key={news.id} 
                                    href={`/news/${news.id}`}
                                    className="flex gap-4 my-2 w-full hover:bg-gray-50 p-2 rounded transition-colors duration-200"
                                >
                                    <div className='w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 lg:w-28 lg:h-20 xl:w-32 xl:h-24 bg-gray-200 flex-shrink-0 rounded overflow-hidden'>
                                        {displayImage ? (
                                            <Image
                                                src={displayImage}
                                                alt={news.title}
                                                width={128}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                <span className="text-gray-500 text-xs">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <h3 className='text-sm sm:text-base font-medium text-gray-900 leading-tight mb-1'>
                                            {truncateText(news.title, 50)}
                                        </h3>
                                        <p className='text-xs sm:text-sm text-gray-600 leading-relaxed'>
                                            {truncateText(
                                                news.excerpt || news.description || 'Baca artikel lengkap...',
                                                60
                                            )}
                                        </p>
                                        <p className='text-xs text-gray-400 mt-1'>
                                            {new Date(news.createdAt).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short'
                                            })}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        // No news available
                        <div className="p-4 text-center">
                            <p className="text-gray-500 text-sm">Belum ada berita tersedia</p>
                        </div>
                    )}
                    
                    {/* Link to view all news */}
                    <div className="mt-4 p-2">
                        <Link 
                            href="/news"
                            className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium border border-blue-200 rounded px-4 py-2 hover:bg-blue-50 transition-colors duration-200"
                        >
                            Lihat Semua Berita →
                        </Link>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
            </div>

            <Footer />
        </div>
    )
}

export default MainLayout;