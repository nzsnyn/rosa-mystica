'use client';

import React, { useState } from "react";
import { RiHistoryLine } from "react-icons/ri";
import { LuCalendarClock } from "react-icons/lu";
import { PiTargetLight, PiEraserBold } from "react-icons/pi";
import { CiCreditCard1 } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/navbar/Footer";

export default function Home() {
  // State untuk mengelola hover effect
  const [isHovering, setIsHovering] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form reset
  const handleFormReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const cardItems = [
    {
      icon: RiHistoryLine,
      title: "Visi Misi",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    },
    {
      icon: LuCalendarClock,
      title: "Sejarah",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    },
    {
      icon: PiTargetLight,
      title: "Jadwal Kegiatan",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    },
  ];
  return (
    <div>
      <Navbar />
      <h1 className="text-center font-cormorant font-bold text-5xl mt-14">
        Gua Maria Rosa Mystica
      </h1>
      <div className="flex flex-col items-center justify-center w-3/4 mx-auto mt-4">
        <p className="font-lora text-center text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis veniam
          eveniet sed doloremque nesciunt possimus, adipisci non repellat in,
          natus voluptatibus beatae ut aperiam provident cumque ad enim
          voluptatum voluptate. Vitae tempora eum modi, deleniti voluptatibus
          ipsum architecto est deserunt recusandae nihil similique!
          Reprehenderit veritatis non ullam labore sunt culpa praesentium ipsum
          fugiat iure natus? Molestias repellendus quisquam laboriosam
          architecto. Maiores, nobis ut labore id quae obcaecati quidem quaerat
          autem amet, rerum, sint accusamus. Beatae necessitatibus ipsa aut
          omnis. Possimus, nemo eligendi. Fugit rerum sint sed deleniti
          asperiores cum ipsam! Totam et nam similique id recusandae soluta,
          atque odit reiciendis doloremque ab? Quibusdam necessitatibus
          explicabo nisi illum laudantium nulla obcaecati, quaerat natus
          voluptates ipsa ea beatae magnam ducimus error aliquam. Sed, iste!
          Repudiandae necessitatibus recusandae eos eius assumenda? Tempore
          ratione minima nostrum eos numquam suscipit molestias! At vitae id
          quis ad excepturi libero pariatur? Numquam laudantium dolorem sunt
          quaerat facilis.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-20 w-3/4 mx-auto">
        {cardItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-opacity-90 w-72 h-72 rounded-lg shadow-lg font-cormorant"
            >
              <IconComponent className="text-6xl" />
              <h2 className="font-bold text-xl mt-4">{item.title}</h2>
              <p className="text-center mt-2 font-lora">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Header Tim */}
      <div
        className="w-full h-auto min-h-[300px] md:h-[400px] lg:h-[525px] bg-[url(/header_tim.png)] bg-no-repeat bg-cover bg-blend-soft-light relative mt-16 flex flex-col justify-between"
        style={{ backgroundColor: "rgba(139, 94, 131, 0.4)" }}
      >
        <div>
          <h1 className="font-cormorant text-white text-center text-4xl font-bold pt-10">
            Tim Pengelola
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24 mt-10 px-4">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="circle w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[197px] lg:h-[197px] bg-slate-200 rounded-full flex items-center justify-center text-center shadow-md">
                    Foto {index + 1}
                  </div>
                  <h3 className="mt-4 font-cormorant font-bold text-white text-xl">
                    Name {index + 1}
                  </h3>
                  <p className="text-white text-center mt-2 font-lora text-sm md:text-base">
                    Position {index + 1}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <h1 className="text-center font-bold font-cormorant text-white text-2xl mb-6">
          See more
        </h1>
      </div>

      {/* Dokumkentasi */}
      <h1 className="text-center font-cormorant font-bold text-5xl my-14">
        Dokumentasi Gua Maria Rosa Mystica
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto mt-10 mb-20">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="w-full h-[300px] bg-gray-300 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="font-cormorant font-bold text-2xl">
                Dokumentasi {index + 1}
              </h3>
            </div>
          ))}
      </div>

      {/* Informasi Donasi dengan React State */}
      <h1 className="text-center font-cormorant font-bold text-5xl my-14">
        Informasi Donasi
      </h1>
      <div className="flex justify-center w-11/12 mx-auto mb-20">
        <div
          className={`w-[248px] h-[60px] rounded-full ${
            isHovering ? "bg-purple-600" : "bg-blue-500"
          } shadow-lg transition-all duration-300 ease-in-out flex items-center px-4 cursor-pointer`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <CiCreditCard1 className="text-white text-2xl min-w-9 w-9" />
          <div className="ml-3">
            <p className="text-white font-cormorant font-bold text-lg">
              {isHovering ? "123445" : "No. Rekening"}
            </p>
          </div>
        </div>
      </div>

      {/* Hubungi Kami */}
      <h1 className="text-center font-cormorant font-bold text-5xl my-14">
        Hubungi Kami
      </h1>
      <div className="flex flex-row flex-wrap items-center justify-center gap-8 w-11/12 mx-auto mt-4 mb-20">
        {[
          {
            icon: FaLocationDot,
            label: "Alamat:",
            info: "Jl. Raya No. 123, Jakarta",
          },
          {
            icon: MdMailOutline,
            label: "Email:",
            info: "guamariatuntang@gmail.com",
          },
          { icon: FaPhoneAlt, label: "Telepon:", info: "(021) 12345678" },
        ].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-center gap-3 w-auto">
              <IconComponent className="text-2xl flex-shrink-0 text-[#8A9A5B]" />
              <p className="font-lora text-lg whitespace-normal">
                <span className="font-medium">{item.label}</span> {item.info}
              </p>
            </div>
          );
        })}
      </div>

      {/* Form and Map Sections Side-by-Side */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 w-11/12 mx-auto mb-20">
        {/* Form Section */}
        <div className="w-full md:w-1/2 ">
          <form className="w-full">
            {[
              {
                icon: BsPeople,
                label: "Nama:",
                id: "name",
                type: "text",
              },
              {
                icon: MdMailOutline,
                label: "Email:",
                id: "email",
                type: "email",
              },
              {
                icon: MdOutlineMessage,
                label: "Pesan:",
                id: "message",
                type: "textarea",
                rows: 4,
              },
            ].map((field, index) => {
              const IconComponent = field.icon;
              return (
                <div key={index} className="flex flex-col mb-4 w-full">
                  <span className="flex items-center gap-2">
                    <IconComponent className="text-2xl flex-shrink-0 text-[#8A9A5B]" />
                    <label className="font-lora text-lg" htmlFor={field.id}>
                      {field.label}
                    </label>
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      rows={field.rows || 4}
                      className="w-full max-w-full border border-gray-300 rounded-md p-2"
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      className="w-full max-w-full border border-gray-300 rounded-md p-2"
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleInputChange}
                      required
                    />
                  )}
                </div>
              );
            })}
            <div className="flex justify-end gap-3 mt-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-cormorant font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
              >
                <IoIosSend className="text-xl" />
                <span>Kirim</span>
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-cormorant font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
                onClick={handleFormReset}
              >
                <PiEraserBold className="text-xl" />
                <span>Bersihkan</span>
              </button>
            </div>
          </form>
        </div>

        {/* Map Section */}
        <div className="w-full md:w-1/2 h-[350px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.926862235567!2d110.48170619999999!3d-7.249164700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708305bb90ca35%3A0x165689ec5ce459e4!2sSaint%20Mary%20Rosa%20Mystica%20Cave%20Banyurip!5e0!3m2!1sen!2sid!4v1747218875577!5m2!1sen!2sid"
            className="w-full h-full border-0"
            title="Lokasi Gua Maria Rosa Mystica"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}
