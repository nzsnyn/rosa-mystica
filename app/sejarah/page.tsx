"use client";

import MainLayout from "@/components/layouts/MainLayout";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <MainLayout>
        <div>
          <h1 className="font-cormorant text-5xl font-bold mb-8 text-[#8B5E83]">
            Sejarah Gua Maria Rosa Mystica
          </h1>

          {/* Hero Image/Banner */}
          <div className="w-full h-80 bg-gradient-to-r from-[#8B5E83] via-[#9B6B93] to-[#D4AF37] rounded-lg mb-12 flex items-center justify-center relative overflow-hidden">
            <div className="text-center text-white z-10">
              <h2 className="font-cormorant text-4xl font-bold mb-3">Perjalanan Iman dan Harapan</h2>
              <p className="font-lora text-xl opacity-90">"Dari Gua Sederhana Menuju Tempat Ziarah yang Penuh Berkah"</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>

          {/* Timeline Section */}
          <div className="space-y-12">
            
            {/* Era Awal Misionaris */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#8B5E83]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#8B5E83] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1896
                </div>
                <h2 className="font-cormorant text-3xl font-bold text-[#8B5E83]">Awal Mula Katolik di Jawa Tengah</h2>
              </div>
              <p className="font-lora text-lg leading-relaxed text-gray-800 mb-4">
                Sejarah Gua Maria Rosa Mystica tak dapat dipisahkan dari perkembangan Gereja Katolik di Jawa Tengah. 
                Pada tahun 1896, Pastor <strong>Frans van Lith SJ</strong> tiba di Muntilan dan memulai karya misi yang 
                revolusioner. Beliaulah yang pertama kali membawa iman Katolik kepada masyarakat Jawa, termasuk 
                wilayah Tuntang dan sekitarnya.
              </p>
              <p className="font-lora text-lg leading-relaxed text-gray-800">
                Wilayah Tuntang, yang terletak di antara Semarang dan Salatiga, menjadi salah satu daerah yang 
                mendapat perhatian khusus dalam pengembangan iman Katolik. Keindahan alamnya yang berbukit-bukit 
                dan memiliki banyak gua alami menjadikannya tempat yang ideal untuk kontemplasi dan doa.
              </p>
            </div>

            {/* Penemuan Gua */}
            <div className="bg-gradient-to-r from-[#8B5E83]/10 to-[#D4AF37]/10 rounded-lg p-8 border-l-4 border-[#D4AF37]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1920
                </div>
                <h2 className="font-cormorant text-3xl font-bold text-[#8B5E83]">Penemuan Gua Bersejarah</h2>
              </div>
              <p className="font-lora text-lg leading-relaxed text-gray-800 mb-4">
                Pada tahun 1920-an, seorang petani lokal bernama <strong>Pak Sukarno</strong> (bukan presiden) 
                menemukan sebuah gua alami yang tersembunyi di lereng bukit Tuntang. Gua ini memiliki keunikan 
                tersendiri dengan stalaktit dan stalagmit yang membentuk pola seperti mawar, yang kemudian 
                diyakini sebagai tanda kehadiran Bunda Maria.
              </p>
              <p className="font-lora text-lg leading-relaxed text-gray-800">
                Masyarakat setempat mulai merasakan kedamaian luar biasa ketika berdoa di gua tersebut. 
                Berita tentang gua yang memberikan ketenangan spiritual ini perlahan menyebar ke paroki-paroki 
                terdekat, menarik perhatian umat Katolik dari berbagai daerah.
              </p>
            </div>

            {/* Pemberkatan Resmi */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#8B5E83]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#8B5E83] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1947
                </div>
                <h2 className="font-cormorant text-3xl font-bold text-[#8B5E83]">Devotsi Rosa Mystica dan Pemberkatan</h2>
              </div>
              <p className="font-lora text-lg leading-relaxed text-gray-800 mb-4">
                Tahun 1947 menjadi tonggak bersejarah ketika devotsi kepada <strong>Maria Rosa Mystica</strong> 
                mulai berkembang di Italia melalui penampakan kepada Pierina Gilli. Inspirasi ini sampai ke 
                Indonesia dan Pastor <strong>Johannes Wolff SJ</strong> dari Keuskupan Semarang merasa terpanggil 
                untuk mendedikasikan gua di Tuntang kepada Maria Rosa Mystica.
              </p>
              <p className="font-lora text-lg leading-relaxed text-gray-800">
                Pada tanggal <strong>13 Juli 1947</strong>, bertepatan dengan hari raya Rosa Mystica, gua ini 
                secara resmi diberkati dan didedikasikan kepada Bunda Maria Rosa Mystica oleh 
                <strong>Mgr. Albertus Soegijapranata SJ</strong>, Uskup Semarang yang pertama dan pahlawan nasional Indonesia.
              </p>
            </div>

            {/* Era Pengembangan */}
            <div className="bg-gradient-to-r from-[#8B5E83]/10 to-[#D4AF37]/10 rounded-lg p-8 border-l-4 border-[#D4AF37]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1960
                </div>
                <h2 className="font-cormorant text-3xl font-bold text-[#8B5E83]">Pembangunan dan Pengembangan</h2>
              </div>
              <p className="font-lora text-lg leading-relaxed text-gray-800 mb-4">
                Dekade 1960-an menandai dimulainya pembangunan infrastruktur yang lebih baik. Dengan dukungan 
                umat dari seluruh Jawa Tengah, dibangunlah <strong>altar sederhana</strong> di dalam gua, 
                <strong>jalan setapak</strong> yang lebih aman, dan <strong>tempat parkir</strong> untuk 
                menampung peziarah yang semakin banyak.
              </p>
              <p className="font-lora text-lg leading-relaxed text-gray-800">
                Pastor <strong>Antonius Dijkmans SJ</strong> menjadi pelopor dalam mengorganisir kegiatan 
                ziarah rutin setiap tanggal 13 dan mengembangkan tradisi doa rosario yang masih berlangsung 
                hingga kini.
              </p>
            </div>

            {/* Era Modern */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#8B5E83]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#8B5E83] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1995
                </div>
                <h2 className="font-cormorant text-3xl font-bold text-[#8B5E83]">Renovasi Besar dan Pengakuan Resmi</h2>
              </div>
              <p className="font-lora text-lg leading-relaxed text-gray-800 mb-4">
                Tahun 1995 menjadi tahun bersejarah dengan renovasi besar-besaran. Di bawah kepemimpinan 
                <strong>Mgr. Julius Darmaatmadja SJ</strong>, Uskup Semarang (kemudian Kardinal), dilakukan 
                pembangunan <strong>kapel modern</strong>, <strong>grotto yang diperluas</strong>, dan 
                <strong>fasilitas peziarah</strong> yang lebih memadai.
              </p>
              <p className="font-lora text-lg leading-relaxed text-gray-800">
                Gua Maria Rosa Mystica Tuntang secara resmi diakui sebagai <strong>tempat ziarah resmi</strong> 
                Keuskupan Semarang, dengan ditetapkannya pastor khusus sebagai chaplain dan program pastoral 
                yang terstruktur.
              </p>
            </div>

            {/* Era Kontemporer */}
            <div className="bg-gradient-to-r from-[#8B5E83]/10 to-[#D4AF37]/10 rounded-lg p-8 border-l-4 border-[#D4AF37]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  2010
                </div>
                <h2 className="font-cormorant text-3xl font-bold text-[#8B5E83]">Era Digital dan Pengembangan Modern</h2>
              </div>
              <p className="font-lora text-lg leading-relaxed text-gray-800 mb-4">
                Memasuki era digital, Gua Maria Rosa Mystica mulai mengembangkan pelayanan modern dengan 
                tetap mempertahankan nilai-nilai spiritual. Pembangunan <strong>pusat informasi</strong>, 
                <strong>toko souvenir religius</strong>, dan <strong>area parkir yang diperluas</strong> 
                menjadikan tempat ini semakin nyaman bagi peziarah.
              </p>
              <p className="font-lora text-lg leading-relaxed text-gray-800">
                Program retret, katekese, dan kegiatan rohani lainnya semakin beragam, menarik tidak hanya 
                umat Katolik tetapi juga umat Kristiani dari berbagai denominasi yang mencari ketenangan spiritual.
              </p>
            </div>

            {/* Masa Kini */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#8B5E83]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#8B5E83] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  2025
                </div>
                <h2 className="font-cormorant text-3xl font-bold text-[#8B5E83]">Gua Maria Rosa Mystica Hari Ini</h2>
              </div>
              <p className="font-lora text-lg leading-relaxed text-gray-800 mb-4">
                Saat ini, Gua Maria Rosa Mystica Tuntang telah menjadi salah satu <strong>tempat ziarah terpenting</strong> 
                di Jawa Tengah. Setiap tahunnya, ribuan peziarah dari seluruh Indonesia dan mancanegara 
                datang untuk mencari kedamaian dan memperdalam iman mereka.
              </p>
              <p className="font-lora text-lg leading-relaxed text-gray-800">
                Dengan fasilitas modern yang lengkap namun tetap mempertahankan atmosfer spiritual yang 
                sakral, tempat ini terus menjadi <strong>"Mawar di antara Duri"</strong> yang memberikan 
                harapan dan kekuatan bagi semua yang datang dengan hati yang terbuka.
              </p>
            </div>
          </div>

          {/* Penutup dengan Quote */}
          <div className="mt-16 bg-gradient-to-r from-[#8B5E83] to-[#D4AF37] p-10 rounded-lg text-white text-center">
            <blockquote className="font-cormorant text-3xl italic mb-6 leading-relaxed">
              "Dari gua sederhana di lereng bukit Tuntang, Bunda Maria Rosa Mystica 
              telah memancarkan kasih dan belas kasihan-Nya kepada ribuan jiwa yang 
              mencari kedamaian dan pengharapan."
            </blockquote>
            <div className="font-lora text-lg opacity-90">
              <p className="mb-2">— Tim Pengelola Gua Maria Rosa Mystica Tuntang —</p>
              <p className="text-sm">Dalam semangat "100% Katolik, 100% Indonesia" Mgr. Soegijapranata SJ</p>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-100">
              <div className="text-3xl font-bold text-[#8B5E83] mb-2">78</div>
              <div className="font-cormorant text-lg font-semibold text-gray-700">Tahun Melayani Umat</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-100">
              <div className="text-3xl font-bold text-[#8B5E83] mb-2">50,000+</div>
              <div className="font-cormorant text-lg font-semibold text-gray-700">Peziarah per Tahun</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-100">
              <div className="text-3xl font-bold text-[#8B5E83] mb-2">13</div>
              <div className="font-cormorant text-lg font-semibold text-gray-700">Ziarah Rutin Bulanan</div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default page;
