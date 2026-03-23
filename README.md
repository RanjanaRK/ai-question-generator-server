# AI Question Generator (AskPDF)

An AI-powered backend service that converts PDFs into MCQs (Multiple Choice Questions) and Q&A pairs using advanced AI models.
Built with Node.js, Express, Prisma, and Google GenAI, this project enables intelligent document understanding and automated question generation.

---

## 🚀 Features

- 📄 Upload PDF files
- 🧠 Extract text from PDFs
- ❓ Generate:
  - MCQs (Multiple Choice Questions)
  - Q&A (Question & Answer pairs)
- 🔐 Authentication system (Email + Google OAuth)
- ☁️ File storage using Supabase
- 🗄️ Database management using Prisma
- 📦 Modular and scalable backend architecture
- ⏱️ Background jobs using cron

---

## 🛠️ Tech Stack

- Backend: Node.js, Express
- Language: TypeScript
- Database: PostgreSQL (via Prisma)
- ORM: Prisma
- Authentication: Passport.js (Google OAuth + Sessions)
- AI Integration: Google Generative AI (@google/genai)
- File Upload: Multer
- PDF Parsing: pdf-parse
- Storage: Supabase
- Validation: Zod

---

## 📂 Project Structure

```ai-question-generator-server/
│
├── prisma/              # Database schema & migrations
├── src/
│   ├── config/          # Core configuration files
│   ├── controllers/     # Route controllers
│   │   ├── auth/
│   │   └── user/
│   │
│   ├── routes/          # Express routes
│   ├── middlewares/     # Auth & validation middleware
│   ├── service/         # Business logic layer
│   ├── lib/             # AI, PDF parsing, storage logic
│   ├── utils/           # Helper functions
│   │
│   ├── index.ts         # Entry point
│   └── server.ts        # Server config
│
├── uploads/             # Uploaded PDF files
├── .env                 # Environment variables
└── package.json
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repositor

git clone RanjanaRK/ai-question-generator-server

### 2️⃣ Install Dependencies

npm install

###3️⃣ Setup Environment Variables

Create a .env file in root:

DATABASE_URL= YOUR_DATABASE_URL_HERE

SUPABASE_URL= YOUR_SUPABASE_URL_HERE

SUPABASE_SERVICE_ROLE_KEY= YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE

SUPABASE_SECRET_KEY= YOUR_SUPABASE_SECRET_KEY_HERE

PORT= YOUR_PORT_HERE

GOOGLE_CLIENT_ID=**INSERT_CLIENT_ID_HERE**

GOOGLE_CLIENT_SECRET=**INSERT_CLIENT_SECRET_HERE**

### 4️⃣ Run Database Migration

npm run db:deploy

### 5️⃣ Run Development Server

npm run dev

### 6️⃣ Build & Start Production

npm run build
npm start

---

## 📌 API Features Overview

### Upload PDF

- Accepts PDF file
- Extracts text using pdf-parse
