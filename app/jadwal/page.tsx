"use client";

import MainLayout from '@/components/layouts/MainLayout';
import Navbar from '@/components/navbar/Navbar';
import React from 'react'

const page = () => {
  return (
     <div>
      <Navbar />
      <MainLayout>
        <div>
          <h1 className='font-cormorant text-5xl font-bold mb-8'>Jadwal Kegiatan</h1>
          <h2 className='font-cormorant text-4xl font-bold mb-8'>Novena</h2>
          <p className='font-lora text-lg mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <h2 className='font-cormorant text-4xl font-bold mb-8'>Bulan Maria</h2>
          <p className='font-lora text-lg mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </MainLayout>
    </div>
  )
}

export default page