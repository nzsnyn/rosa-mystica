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
                    {/* Modern Header dengan Gradient */}
                    <div className='relative w-full overflow-hidden rounded-t-2xl bg-gradient-to-r from-[#8B5E83] to-[#D4AF37] shadow-lg'>
                        <div className='absolute inset-0 bg-black bg-opacity-10'></div>
                        <div className='relative px-6 py-8 text-center'>
                            <div className='inline-flex items-center justify-center w-12 h-12 mb-3 bg-white bg-opacity-20 rounded-full'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v6m0 0l-3-3m3 3l3-3" />
                                </svg>
                            </div>
                            <h2 className='font-lora text-2xl md:text-3xl font-bold text-white drop-shadow-sm'>
                                Berita Terbaru
                            </h2>
                            <div className='mt-2 w-16 h-1 bg-white bg-opacity-50 rounded-full mx-auto'></div>
                        </div>
                    </div>

                    {/* Container dengan Shadow dan Border Radius */}
                    <div className='bg-white rounded-b-2xl shadow-lg border-t-0 overflow-hidden'>
                        {loading ? (
                        // Loading state dengan skeleton yang lebih menarik
                        <div className="p-4 space-y-4">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="flex gap-4 p-3 rounded-lg bg-gray-50">
                                        <div className='w-20 h-16 bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 rounded-lg'></div>
                                        <div className='flex-1 space-y-2'>
                                            <div className='h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-full'></div>
                                            <div className='h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4'></div>
                                            <div className='h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/2'></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : latestNews.length > 0 ? (
                        // Actual news data dengan design yang lebih menarik
                        <div className="p-4 space-y-3">
                            {latestNews.map((news, index) => {
                                // Get image from main path or first image in markdown content
                                const displayImage = news.path || getFirstImageFromMarkdown(news.content || '');
                                
                                return (
                                    <Link 
                                        key={news.id} 
                                        href={`/news/${news.id}`}
                                        className="group block"
                                    >
                                        <div className="relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                            {/* Featured First Article */}
                                            {index === 0 && (
                                                <div className="relative">
                                                    <div className="h-48 w-full overflow-hidden">
                                                        {displayImage ? (
                                                            <Image
                                                                src={displayImage}
                                                                alt={news.title}
                                                                width={400}
                                                                height={192}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-[#8B5E83] to-[#D4AF37] flex items-center justify-center">
                                                                <svg className="w-12 h-12 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v6m0 0l-3-3m3 3l3-3" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="absolute top-3 left-3">
                                                        <span className="bg-[#D4AF37] text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                            Terbaru
                                                        </span>
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className='text-base font-semibold text-gray-900 leading-tight mb-2 group-hover:text-[#8B5E83] transition-colors'>
                                                            {truncateText(news.title, 60)}
                                                        </h3>
                                                        <p className='text-sm text-gray-600 leading-relaxed mb-2'>
                                                            {truncateText(
                                                                news.excerpt || news.description || 'Baca artikel lengkap...',
                                                                80
                                                            )}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <p className='text-xs text-gray-500 font-medium'>
                                                                {new Date(news.createdAt).toLocaleDateString('id-ID', {
                                                                    day: 'numeric',
                                                                    month: 'long',
                                                                    year: 'numeric'
                                                                })}
                                                            </p>
                                                            <div className="flex items-center text-[#8B5E83] text-xs font-medium">
                                                                Baca <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Regular Articles */}
                                            {index > 0 && (
                                                <div className="flex gap-3 p-3">
                                                    <div className='w-20 h-16 bg-gray-100 flex-shrink-0 rounded-lg overflow-hidden'>
                                                        {displayImage ? (
                                                            <Image
                                                                src={displayImage}
                                                                alt={news.title}
                                                                width={80}
                                                                height={64}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='flex-1 min-w-0'>
                                                        <h3 className='text-sm font-semibold text-gray-900 leading-tight mb-1 group-hover:text-[#8B5E83] transition-colors'>
                                                            {truncateText(news.title, 45)}
                                                        </h3>
                                                        <p className='text-xs text-gray-600 leading-relaxed mb-2'>
                                                            {truncateText(
                                                                news.excerpt || news.description || 'Baca artikel lengkap...',
                                                                50
                                                            )}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <p className='text-xs text-gray-500'>
                                                                {new Date(news.createdAt).toLocaleDateString('id-ID', {
                                                                    day: 'numeric',
                                                                    month: 'short'
                                                                })}
                                                            </p>
                                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <svg className="w-3 h-3 text-[#8B5E83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        // No news available
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v6m0 0l-3-3m3 3l3-3" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Belum ada berita tersedia</p>
                            <p className="text-gray-400 text-xs mt-1">Berita akan muncul di sini</p>
                        </div>
                    )}
                    
                    {/* Link to view all news dengan styling yang lebih menarik */}
                    {latestNews.length > 0 && (
                        <div className="p-4 border-t border-gray-100">
                            <Link 
                                href="/news"
                                className="group flex items-center justify-center w-full text-center bg-gradient-to-r from-[#8B5E83] to-[#D4AF37] text-white font-medium py-3 px-4 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <span>Lihat Semua Berita</span>
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                    </div>
                </div>
            </div>

            <div className='mt-10'>
            </div>

            <Footer />
        </div>
    );
}

export default MainLayout;