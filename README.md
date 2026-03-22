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
- Database: PostgreSQL / MySQL (via Prisma)
- ORM: Prisma
- Authentication: Passport.js (Google OAuth + Sessions)
- AI Integration: Google Generative AI (@google/genai)
- File Upload: Multer
- PDF Parsing: pdf-parse
- Storage: Supabase
- Validation: Zod
