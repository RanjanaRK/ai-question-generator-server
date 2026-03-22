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

```ai-question-generator-server/
│
├── prisma/              # Database schema & migrations
├── src/
│   ├── config/          # App & DB configuration
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
