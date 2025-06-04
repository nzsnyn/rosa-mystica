# Panduan Sistem Donasi Rosa Mystica

## Fitur Lengkap
- ✅ Form donasi dengan validasi lengkap
- ✅ Upload bukti donasi (gambar, max 5MB)
- ✅ Format Rupiah otomatis
- ✅ Integrasi database dan API
- ✅ Halaman admin untuk kelola donasi
- ✅ Status donasi (PENDING/VERIFIED/REJECTED)
- ✅ Statistik donasi di dashboard admin
- ✅ Interface dalam Bahasa Indonesia

## Cara Penggunaan

### Untuk Pengguna (Donatur):
1. Buka halaman utama website Rosa Mystica
2. Scroll ke bagian informasi rekening donasi
3. Klik pada area nomor rekening atau tombol donasi
4. Isi form donasi:
   - Nama lengkap (wajib)
   - Kota asal (wajib) 
   - Nominal donasi (format Rupiah otomatis, wajib)
   - Upload bukti transfer (gambar JPG/PNG/WebP, max 5MB, wajib)
5. Klik "Kirim Donasi"
6. Tunggu konfirmasi admin

### Untuk Admin:
1. Login ke panel admin: `http://localhost:3000/admin`
2. Dashboard menampilkan statistik donasi:
   - Total donasi masuk
   - Jumlah donasi pending
   - Jumlah donasi terverifikasi
3. Kelola donasi di: `http://localhost:3000/admin/donations`
4. Fitur admin:
   - Lihat semua donasi
   - Filter berdasarkan status
   - Lihat detail bukti donasi
   - Update status donasi (Pending → Verified/Rejected)
   - Pagination untuk donasi banyak

## Struktur Database

```sql
model Donation {
  id             Int             @id @default(autoincrement())
  name           String          // Nama donatur
  city           String          // Kota asal
  amount         Int             // Nominal dalam Rupiah
  proofImagePath String          // Path ke bukti donasi
  status         DonationStatus  @default(PENDING)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
}

enum DonationStatus {
  PENDING
  VERIFIED
  REJECTED
}
```

## API Endpoints

### POST /api/donations
Mengirim donasi baru
- Body: FormData dengan fields: name, city, amount, proofFile
- Response: Data donasi yang baru dibuat

### GET /api/donations
Mengambil daftar donasi (untuk admin)
- Query params: status, page, limit
- Response: List donasi dengan pagination

### PUT /api/donations/[id]
Update status donasi
- Body: { status: "VERIFIED" | "REJECTED" }
- Response: Data donasi yang diupdate

### GET /api/donations/[id]
Mengambil detail donasi
- Response: Detail donasi

## File Upload
- Lokasi: `public/uploads/donations/`
- Format: `donation_[timestamp].[extension]`
- Validasi: Hanya gambar, max 5MB
- Akses: `/uploads/donations/filename.jpg`

## Status Donasi
- **PENDING**: Donasi baru masuk, menunggu verifikasi admin
- **VERIFIED**: Admin sudah memverifikasi donasi valid
- **REJECTED**: Admin menolak donasi (biasanya bukti tidak valid)

## Keamanan
- File upload divalidasi (hanya gambar, max 5MB)
- FormData validation di server
- Error handling lengkap
- Database transaction safe
