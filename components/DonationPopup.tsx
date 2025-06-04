'use client';

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsPeople } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRupiahSign } from 'react-icons/fa6';
import { MdCloudUpload } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import { PiEraserBold } from 'react-icons/pi';

interface DonationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DonationFormData {
  name: string;
  city: string;
  amount: string;
  proofFile: File | null;
}

const DonationPopup: React.FC<DonationPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<DonationFormData>({
    name: '',
    city: '',
    amount: '',
    proofFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        alert('Ukuran file harus kurang dari 5MB');
        e.target.value = '';
        return;
      }

      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar (JPG, PNG, WebP, dll.)');
        e.target.value = '';
        return;
      }

      setFormData(prev => ({
        ...prev,
        proofFile: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("amount", formData.amount);
      
      if (formData.proofFile) {
        formDataToSend.append("proofFile", formData.proofFile);
      }

      const response = await fetch("/api/donations", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal mengirim donasi");
      }

      const result = await response.json();
      alert("Terima kasih! Donasi Anda telah berhasil dikirim dan akan diverifikasi oleh admin.");
      handleReset();
      onClose();
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert(error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim donasi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      city: '',
      amount: '',
      proofFile: null,
    });
    setPreviewUrl(null);
  };

  const formatRupiah = (value: string) => {
    // Remove non-digits
    const numericValue = value.replace(/\D/g, '');
    
    // Format with thousand separators
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRupiah(e.target.value);
    setFormData(prev => ({
      ...prev,
      amount: formatted,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-cormorant font-bold text-gray-800">
            Form Donasi
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nama */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BsPeople className="text-xl text-[#8A9A5B]" />
              <label htmlFor="name" className="font-lora text-lg font-medium">
                Nama Lengkap *
              </label>
            </div>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Masukkan nama lengkap Anda"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Kota */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-xl text-[#8A9A5B]" />
              <label htmlFor="city" className="font-lora text-lg font-medium">
                Kota *
              </label>
            </div>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              placeholder="Masukkan kota asal Anda"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Nominal Donasi */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaRupiahSign className="text-xl text-[#8A9A5B]" />
              <label htmlFor="amount" className="font-lora text-lg font-medium">
                Nominal Donasi *
              </label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                Rp
              </span>
              <input
                type="text"
                id="amount"
                value={formData.amount}
                onChange={handleAmountChange}
                required
                placeholder="0"
                className="w-full border border-gray-300 rounded-md p-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Upload Bukti Donasi */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MdCloudUpload className="text-xl text-[#8A9A5B]" />
              <label htmlFor="proof" className="font-lora text-lg font-medium">
                Bukti Donasi *
              </label>
            </div>
            <div className="space-y-3">
              <input
                type="file"
                id="proof"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500">
                Upload bukti transfer (JPG, PNG, WebP, dll.) maksimal 5MB
              </p>
              
              {previewUrl && (
                <div className="border rounded-lg p-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau:</p>
                  <img
                    src={previewUrl}
                    alt="Pratinjau bukti donasi"
                    className="max-w-full h-32 object-contain rounded-md border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Info Rekening */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-cormorant font-bold text-lg text-blue-800 mb-2">
              Informasi Rekening
            </h3>
            <div className="space-y-1 text-sm text-blue-700">
              <p><span className="font-medium">Bank:</span> BCA</p>
              <p><span className="font-medium">No. Rekening:</span> 123445</p>
              <p><span className="font-medium">Atas Nama:</span> Gua Maria Rosa Mystica</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-cormorant font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <IoIosSend className="text-xl" />
                  <span>Kirim Donasi</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-cormorant font-bold py-3 px-4 rounded-md flex items-center gap-2 transition-colors"
            >
              <PiEraserBold className="text-xl" />
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationPopup;
