'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { IoRefresh } from 'react-icons/io5';
import ErrorBoundaryImage from '@/components/ErrorBoundaryImage';

interface Donation {
  id: string;
  name: string;
  city: string;
  amount: number;
  proofImagePath: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchDonations = async (page: number = 1, status: string = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });
      
      if (status) {
        params.append('status', status);
      }

      const response = await fetch(`/api/donations?${params}`);
      if (!response.ok) throw new Error('Failed to fetch donations');
      
      const data = await response.json();
      setDonations(data.donations);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching donations:', error);
      alert('Gagal memuat data donasi');
    } finally {
      setLoading(false);
    }
  };

  const updateDonationStatus = async (donationId: string, newStatus: 'VERIFIED' | 'REJECTED') => {
    setUpdating(donationId);
    try {
      const response = await fetch(`/api/donations/${donationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update donation status');
      
      // Refresh donations list
      await fetchDonations(pagination.page, filter);
      alert(`Status donasi berhasil diubah menjadi ${newStatus === 'VERIFIED' ? 'Terverifikasi' : 'Ditolak'}`);
    } catch (error) {
      console.error('Error updating donation status:', error);
      alert('Gagal mengubah status donasi');
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    fetchDonations(pagination.page, filter);
  }, [filter]);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'VERIFIED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Menunggu';
      case 'VERIFIED':
        return 'Terverifikasi';
      case 'REJECTED':
        return 'Ditolak';
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-cormorant font-bold text-gray-900">
            Manajemen Donasi
          </h1>
          <button
            onClick={() => fetchDonations(pagination.page, filter)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <IoRefresh className="text-lg" />
            Refresh
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Status</option>
              <option value="PENDING">Menunggu</option>
              <option value="VERIFIED">Terverifikasi</option>
              <option value="REJECTED">Ditolak</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data donasi...</p>
          </div>
        ) : (
          <>
            {/* Donations Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donatur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nominal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        Belum ada data donasi
                      </td>
                    </tr>
                  ) : (
                    donations.map((donation) => (
                      <tr key={donation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {donation.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {donation.city}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatRupiah(donation.amount)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                            {getStatusText(donation.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(donation.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedImage(donation.proofImagePath)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded"
                              title="Lihat Bukti"
                            >
                              <FaEye />
                            </button>
                            {donation.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => updateDonationStatus(donation.id, 'VERIFIED')}
                                  disabled={updating === donation.id}
                                  className="text-green-600 hover:text-green-900 p-1 rounded disabled:opacity-50"
                                  title="Verifikasi"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() => updateDonationStatus(donation.id, 'REJECTED')}
                                  disabled={updating === donation.id}
                                  className="text-red-600 hover:text-red-900 p-1 rounded disabled:opacity-50"
                                  title="Tolak"
                                >
                                  <FaTimes />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Menampilkan {donations.length} dari {pagination.total} donasi
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchDonations(pagination.page - 1, filter)}
                    disabled={pagination.page === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Sebelumnya
                  </button>
                  <span className="px-3 py-1 text-sm">
                    Halaman {pagination.page} dari {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchDonations(pagination.page + 1, filter)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Bukti Donasi</h3>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <ErrorBoundaryImage
                  src={selectedImage}
                  alt="Bukti Donasi"
                  className="max-w-full h-auto rounded-lg"
                  fallbackSrc="/placeholders/image-unavailable.svg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
