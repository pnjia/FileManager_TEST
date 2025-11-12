# File Manager Full-Stack

Ini adalah aplikasi web file manager full-stack yang memungkinkan pengguna untuk mengelola folder dan file secara visual.

## 1. Deskripsi Stack Teknologi

Aplikasi ini dibangun menggunakan arsitektur client-server dengan teknologi berikut:

### Frontend (Client-Side)

- **React:** Library JavaScript untuk membangun antarmuka pengguna.
- **Vite:** Build tool modern yang memberikan pengalaman development super cepat.
- **Tailwind CSS:** Framework CSS utility-first untuk desain yang cepat dan responsif.

### Backend (Server-Side)

- **Node.js:** Lingkungan eksekusi JavaScript di sisi server.
- **Express.js:** Framework web minimalis untuk membangun API.
- **Prisma:** ORM (Object-Relational Mapper) modern untuk berinteraksi dengan database.
- **MySQL:** Sistem manajemen database relasional yang digunakan dalam proyek ini.
- **Multer:** Middleware untuk menangani upload file (`multipart/form-data`).

## 2. Petunjuk Instalasi & Menjalankan Proyek

### Clone
```bash
git clone https://github.com/pnjia/FileManager_TEST cd FileManager_TEST
```
lalu 
```bash
cd FileManager_TEST
```
### Prasyarat

- Node.js (v18 atau lebih baru)
- NPM (biasanya terinstal bersama Node.js)
- Server Database MySQL yang sedang berjalan

### Backend Setup

1.  **Masuk ke direktori backend:**

    ```bash
    cd backend
    ```

2.  **Install dependensi:**

    ```bash
    npm install
    ```

3.  **Buat file `.env`:**
    Buat file baru bernama `.env` di dalam direktori `backend` dan isikan URL koneksi database MySQL Anda.

    ```env
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
    PORT=4000
    ```

    Contoh:

    ```env
    DATABASE_URL="mysql://root:password@localhost:3306/filemanager"
    PORT=4000
    ```

4.  **Jalankan migrasi database:**
    Perintah ini akan membuat tabel-tabel yang diperlukan di database Anda sesuai dengan skema Prisma.

    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Jalankan server backend:**
    Server akan berjalan di `http://localhost:4000`.
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  **Buka terminal baru dan masuk ke direktori frontend:**

    ```bash
    cd frontend
    ```

2.  **Install dependensi:**

    ```bash
    npm install
    ```

3.  **Jalankan server development frontend:**
    Aplikasi akan dapat diakses di `http://localhost:5173`.
    ```bash
    npm run dev
    ```

## 3. File SQL Data Uji (Test Data)
[File](https://github.com/pnjia/FileManager_TEST/blob/main/Docs/file.sql)
