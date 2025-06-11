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
          <h1 className="font-cormorant text-5xl font-bold mb-8 text-[#8B5E83]">Visi Misi</h1>
          
          {/* Header Image/Banner */}
          <div className="w-full h-64 bg-gradient-to-r from-[#8B5E83] to-[#D4AF37] rounded-lg mb-12 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="font-cormorant text-3xl font-bold mb-2">Gua Maria Rosa Mystica</h2>
              <p className="font-lora text-lg opacity-90">"Mawar Mistik, Bunda Gereja"</p>
            </div>
          </div>

          <h2 className="font-cormorant text-4xl font-bold mb-6 text-[#8B5E83]">Visi</h2>
          <div className="bg-gradient-to-r from-[#8B5E83]/10 to-[#D4AF37]/10 p-6 rounded-lg mb-8 border-l-4 border-[#8B5E83]">
            <p className="font-lora text-lg leading-relaxed text-gray-800">
              Menjadi tempat ziarah dan pusat spiritualitas Katolik yang memberikan kedamaian, 
              pengharapan, dan pembaruan iman bagi semua umat beriman yang datang mencari 
              kehadiran Bunda Maria Rosa Mystica. Kami berusaha menjadi "Mawar di antara Duri" 
              yang memberikan keharuman kasih dan belas kasihan Allah kepada semua yang 
              membutuhkan penyembuhan rohani dan jasmani.
            </p>
          </div>

          <h2 className="font-cormorant text-4xl font-bold mb-6 text-[#8B5E83]">Misi</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="font-cormorant text-xl font-bold mb-3 text-[#8B5E83]">1. Pelayanan Pastoral</h3>
              <p className="font-lora text-gray-700 leading-relaxed">
                Menyediakan pelayanan pastoral yang berkualitas melalui perayaan Ekaristi, 
                sakramen-sakramen, dan kegiatan rohani yang membantu umat dalam perjalanan 
                iman mereka menuju Kristus melalui Bunda Maria.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="font-cormorant text-xl font-bold mb-3 text-[#8B5E83]">2. Pusat Doa dan Kontemplasi</h3>
              <p className="font-lora text-gray-700 leading-relaxed">
                Menciptakan suasana yang kondusif untuk doa pribadi dan komunal, 
                meditasi, dan kontemplasi, sehingga setiap peziarah dapat mengalami 
                perjumpaan mendalam dengan Tuhan melalui perantaraan Bunda Maria Rosa Mystica.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="font-cormorant text-xl font-bold mb-3 text-[#8B5E83]">3. Evangelisasi dan Katekese</h3>
              <p className="font-lora text-gray-700 leading-relaxed">
                Menyebarkan devosi kepada Bunda Maria Rosa Mystica dan mengajarkan 
                nilai-nilai Kristiani melalui program katekese, retret, dan kegiatan 
                evangelisasi yang membawa orang semakin dekat kepada Kristus.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="font-cormorant text-xl font-bold mb-3 text-[#8B5E83]">4. Pelayanan Sosial dan Kasih</h3>
              <p className="font-lora text-gray-700 leading-relaxed">
                Mewujudkan kasih Kristus melalui pelayanan kepada sesama, terutama 
                mereka yang membutuhkan, sebagai cerminan dari belas kasihan Bunda Maria 
                yang senantiasa peduli kepada anak-anaknya.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="font-cormorant text-xl font-bold mb-3 text-[#8B5E83]">5. Pemeliharaan Warisan Spiritual</h3>
              <p className="font-lora text-gray-700 leading-relaxed">
                Melestarikan dan mengembangkan tradisi spiritual serta sejarah Gua Maria 
                Rosa Mystica sebagai warisan iman yang berharga bagi generasi sekarang 
                dan yang akan datang.
              </p>
            </div>
          </div>

          {/* Quote Section */}
          <div className="mt-12 bg-gradient-to-r from-[#8B5E83] to-[#D4AF37] p-8 rounded-lg text-white text-center">
            <blockquote className="font-cormorant text-2xl italic mb-4">
              "Maria adalah bunga terindah yang pernah dilihat di dunia spiritual. 
              Dia adalah Ratu bunga spiritual; karena itu, dia disebut Mawar, 
              karena mawar disebut sebagai yang terindah dari semua bunga."
            </blockquote>
            <cite className="font-lora text-lg opacity-90">- Beato John Henry Newman</cite>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default page;
