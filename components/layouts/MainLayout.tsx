import React from "react";
import Footer from "../navbar/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className='font-lora'>
            <div className='flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 px-4 sm:px-6 md:px-8 lg:px-12 mt-8 md:mt-12 lg:mt-16'>
                <div className='w-full lg:w-2/3 xl:w-3/4'>
                    {children}
                </div>

                <div className='w-full lg:w-1/3 xl:w-1/4 mt-8 lg:mt-0'>
                    <div className='w-full h-20 md:h-24 bg-slate-200 flex items-center justify-center'>
                        <h1 className='font-lora text-3xl md:text-4xl'>Berita</h1>
                    </div>
                    {Array.from({ length: 5 }, (_, index) => (
                        <div key={index} className="flex gap-4 my-2 w-full">
                            <div className='w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 lg:w-28 lg:h-20 xl:w-32 xl:h-24 bg-[#D9D9D9] flex-shrink-0'></div>
                            <p className='text-sm sm:text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full sm:w-4/5 md:w-3/4 lg:w-2/3 h-64 sm:h-80 md:h-96 bg-[#D9D9D9] flex items-center justify-center mx-auto my-8 md:my-12'>
                <h1>Berita</h1>
            </div>

            <Footer />
        </div>
    )
}

export default MainLayout;