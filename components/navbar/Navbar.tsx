import React, { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

const Navbar = () => {
  const menuItems = ["Home", "Visi Misi", "Sejarah", "Jadwal", "Tim Pengelola", "Berita"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div
      className="w-full h-auto min-h-[300px] md:h-[400px] lg:h-[525px] bg-[url(/header.png)] bg-no-repeat bg-cover bg-blend-soft-light relative"
      style={{ backgroundColor: "rgba(139, 94, 131, 0.4)" }}
    >
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex gap-4 lg:gap-10 text-white font-arial text-lg lg:text-2xl justify-center items-center h-[80px] lg:h-[100px]">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="hover:underline underline-offset-8 hover:decoration-4 hover:decoration-[#D4AF37] cursor-pointer transition-all duration-300 ease-in-out"
              style={{
                textDecorationColor: "#D4AF37",
                textDecorationThickness: "3px",
              }}
            >              <Link
                href={
                  item === "Home"
                    ? "/"
                    : item === "Berita"
                    ? "/news"
                    : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                }
                className="no-underline text-inherit"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden relative">
        <div className="flex justify-between items-center px-4 h-[70px]">
          <Link
            href="/"
            className="text-white font-bold text-xl cursor-pointer hover:opacity-80"
          >
            Rosa Mystica
          </Link>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <HiX className="w-8 h-8" />
            ) : (
              <HiMenu className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#8B5E83] bg-opacity-90 z-50">
            <ul className="flex flex-col p-4">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="py-3 border-b border-white border-opacity-20"
                >                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : item === "Berita"
                        ? "/news"
                        : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                    }
                    className="text-white text-xl block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Header Content */}
      <div className="mt-4 md:mt-8 lg:mt-12">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:ml-10 lg:ml-56 gap-x-4 lg:gap-x-8 px-4 md:px-0">
          <div className="circle w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[197px] lg:h-[197px] bg-[#D4AF37] rounded-full flex items-center justify-center overflow-hidden">
            <Image 
              src={"/logo.png"} 
              alt="logo" 
              width={197} 
              height={197}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="hidden md:block h-[100px] md:h-[120px] lg:h-[160px] w-[6px] md:w-[8px] lg:w-[12px] bg-amber-50"></div>
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h1 className="font-bold text-slate-50 text-4xl md:text-5xl lg:text-7xl">
              Gua Maria <br /> Sancta Rosa <br /> Mystica <br />
              <span className="text-xl md:text-2xl lg:text-3xl">Tuntang</span>
            </h1>
          </div>
        </div>
      </div>      {/* Facebook and Instagram Icons */}
      <div className="flex justify-center gap-2 md:gap-3 items-center mt-6 md:mt-4">
        <FaFacebookF className="text-white text-2xl md:text-3xl lg:text-4xl cursor-pointer w-10 h-10 md:w-12 md:h-12 border-2 border-white p-2 hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 ease-in-out" />
        <FaInstagram className="text-white text-2xl md:text-3xl lg:text-4xl cursor-pointer w-10 h-10 md:w-12 md:h-12 border-2 border-white p-2 hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 ease-in-out" />
      </div>
    </div>
  );
};

export default Navbar;
