import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#8B5E83] to-[#6B4A5C] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3">
                <FaHeart className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-lora">Gua Maria Rosa Mystica</h3>
                <p className="text-[#D4AF37] text-sm">Tuntang</p>
              </div>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              Gua Maria Rosa Mystica Tuntang adalah tempat ziarah dan doa yang memberikan kedamaian spiritual. 
              Kami mengundang semua umat untuk datang berdoa dan merasakan kehadiran Bunda Maria.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors duration-300"
              >
                <FaFacebookF className="text-white text-lg" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors duration-300"
              >
                <FaInstagram className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-lora">Menu Utama</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-200 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/visi-misi" className="text-gray-200 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  Visi & Misi
                </Link>
              </li>
              <li>
                <Link href="/sejarah" className="text-gray-200 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  Sejarah
                </Link>
              </li>
              <li>
                <Link href="/jadwal" className="text-gray-200 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  Jadwal Misa
                </Link>
              </li>
              <li>
                <Link href="/tim-pengelola" className="text-gray-200 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  Tim Pengelola
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-200 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-lora">Kontak & Informasi</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#D4AF37] text-sm mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Jl. Raya Tuntang - Salatiga<br />
                    Desa Tuntang, Kec. Tuntang<br />
                    Kabupaten Semarang, Jawa Tengah
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#D4AF37] text-sm flex-shrink-0" />
                <p className="text-gray-200 text-sm">+62 298 123456</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#D4AF37] text-sm flex-shrink-0" />
                <p className="text-gray-200 text-sm">info@rosamysticatuntang.com</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaClock className="text-[#D4AF37] text-sm mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-200 text-sm font-medium">Jam Buka:</p>
                  <p className="text-gray-300 text-sm">
                    Senin - Minggu: 05.00 - 18.00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2025 Gua Maria Rosa Mystica Tuntang. Hak Cipta Dilindungi.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Dibuat dengan ❤️ untuk kemuliaan Bunda Maria
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Border */}
      <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37]"></div>
    </footer>
  );
};

export default Footer;
