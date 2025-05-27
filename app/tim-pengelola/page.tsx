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
          <h1 className="font-cormorant text-5xl font-bold mb-8">
            Tim Pengelola Gua Maria Rosa Mystica <br /> 2025 - 2025
          </h1>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="bg-white border border-gray-300 w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-6 border-b text-left">No</th>
                  <th className="py-3 px-6 border-b text-left">Nama</th>
                  <th className="py-3 px-6 border-b text-left">Jabatan</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-3 px-6 border-b">{index + 1}</td>
                    <td className="py-3 px-6 border-b">
                      Nama Pengelola {index + 1}
                    </td>
                    <td className="py-3 px-6 border-b">Jabatan {index + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-lora text-lg mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </MainLayout>
    </div>
  );
};

export default page;
