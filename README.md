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
- ⚡ Rate limiting using Redis (FREE vs PRO plans)
- 💾 Caching support for optimized performance
- 🧹 Automated cleanup of expired data (cron jobs)
- ☁️ File storage using Supabase
- 🗄️ Database management using Prisma
- 📦 Modular and scalable backend architecture

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Language:** TypeScript
- **Database:** PostgreSQL (via Prisma)
- **ORM:** Prisma
- **Cache & Rate Limiting:** Redis
- **Authentication:** Passport.js (Google OAuth + Sessions)
- **AI Integration:** Google Generative AI (@google/genai)
- **File Upload:** Multer
- **PDF Parsing:** pdf-parse
- **Storage:** Supabase
- **Validation:** Zod

---

## ⚡ Rate Limiting (Redis)

To prevent abuse and control API usage, Redis is used for rate limiting.

### 🧠 How it works

- Each request increments a counter in Redis
- Counters automatically expire after a time window
- Requests are blocked when limit is exceeded

### 📊 Limits

```
| Plan | MCQ Generation Limit  |
| ---- | --------------------- |
| FREE | 5 per day             |
| PRO  | Higher / configurable |
```

### Example

```ts
await rateLimiter({
  key: `mcq:${userId}`,
  maxRequests: 5,
  windowMs: 86400000, // 1 day
});
```

---

## 📂 Project Structure

```
ai-question-generator-server/
│
├── prisma/ # Database schema & migrations
├── src/
│ ├── config/ # Core configuration files
│ ├── controllers/ # Route controllers
│ │ ├── auth/
│ │ └── user/
│ │
│ ├── routes/ # Express routes
│ ├── middlewares/ # Auth & validation middleware
│ ├── service/ # Business logic layer
│ ├── lib/ # AI, PDF parsing, storage logic
│ ├── utils/ # Helper functions
│ │
│ ├── index.ts # Entry point
│ └── server.ts # Server config
│
├── uploads/ # Uploaded PDF files
├── .env # Environment variables
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone RanjanaRK/ai-question-generator-server

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Setup Environment Variables

#### Create a .env file in root:

DATABASE_URL=your_database_url_here

SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
SUPABASE_SECRET_KEY=your_supabase_secret_key_here

PORT=your_port_here

GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

REDIS_HOST=your_redis_host_here
REDIS_PORT=your_redis_port_here
REDIS_PASSWORD=your_redis_password_here

### 4️⃣ Run Database Migration

npm run db:deploy

### 5️⃣ Run Development Server

npm run dev

### 6️⃣ Build & Start Production

npm run build
npm start

---

## 📌 API Features Overview

### 🔐 1. Authentication

- Email & Password login (with Argon2 hashing)
- Google OAuth login using Passport.js
- Session-based authentication with Prisma session store

### 📄 2. Upload PDF (Main Flow)

**Flow:**

1. User uploads PDF
2. File stored in Supabase Storage
3. PDF parsed using `pdf-parse`
4. Extracted text saved in database
5. Returns `pdfId`

---

### ⚙️ Internal Processing

- Upload handled by **Multer**
- File uploaded to **Supabase bucket (`pdfs`)**
- Text extracted from `file.buffer`
- Data stored in database (Neon via Prisma):

```ts
{
  originalName: string,
  storagePath: string,
  parsedText: string,
  status: "PARSED",
  userId: string
}
```

---

### 🧠 3. Generate AI Content (MCQ & Q&A)

After parsing, AI uses extracted text.

---

```
PDF (parsed text)
↓
Chunking (split text)
↓
Context Selection (top 5 chunks)
↓
Prompt Engineering
↓
Google GenAI (askGemini)
↓
Raw AI Response
↓
JSON Extraction
↓
Validation & Filtering
↓
Database Storage (Neon + Prisma)
↓
Final Response (MCQ / Q&A)
```

### ⚙️ Step-by-Step Processing

1. **User Authentication**
   - Extract `userId` from session
   - Validate user access
   - Check plan restrictions (FREE / PREMIUM)

2. **Fetch Parsed PDF**
   - Retrieve PDF using `pdfId`
   - Ensure `parsedText` exists

3. **Text Chunking**
   - Large text is split using `chunkText()`
   - First 5 chunks are selected as context

4. **AI Prompt Creation**
   - Structured prompt is created with rules:
     - Strict JSON format
     - No extra text
     - Fixed number of questions (5)
     - Controlled difficulty (Medium)

5. **Call AI (Google GenAI)**
   - Send prompt using `askGemini()`
   - Receive raw AI response

6. **Extract & Parse JSON**
   - Extract JSON using `extractJson()`
   - Parse response safely using `JSON.parse()`
   - Handle invalid AI outputs

7. **Validate AI Output**

#### ✅ MCQ Validation:

- Must contain:
  - `question`
  - 4 options (A, B, C, D)
  - Correct answer (A/B/C/D)

#### ✅ Q&A Validation:

- Must contain:
  - `question`
  - `answer`

8. **Normalize Data**

- Handle different AI response formats:
  - `mcqs`
  - `data.mcqs`
  - `questions`

9. **Limit Results**

- Only first 5 valid items are used

10. **Store in Database (Neon via Prisma)**

#### 📘 MCQ:

- Create `mcqSet`
- Store multiple `mcqItem`

#### 📗 Q&A:

- Create `qaSet`
- Store related items

11. **Response to Client**

Returns:

- Generated MCQs or Q&A
- Total count
- Database IDs

---

### 🧹 4. Cron Job (Cleanup System)

Expired MCQs are automatically deleted using scheduled jobs.

Behavior:

- MCQs expire after 28 days (FREE users)
- Cleanup runs every 7 days
- Deletes only expired records

---

## 📡 API Endpoints

### 🔐 Auth Routes (`/api/auth`)

```
| Method | Endpoint | Description |
|--------|--------|------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login |
| POST | /auth/logout | Logout |
| GET | /auth/google | Google OAuth |
| GET | /auth/google/callback | OAuth callback |
```

---

### 📄 PDF Routes (`/api`)

```
| Method | Endpoint | Description |
|--------|--------|------------|
| POST | /api/upload | Upload PDF |
| GET | /api/pdf/:pdfId | Get PDF |
| DELETE | /api/pdf/:pdfId | Delete PDF |
```

---

### 🧠 AI Routes (`/api/ai`)

```
| Method | Endpoint | Description |
|--------|--------|------------|
| POST | /ai/generate/mcq | Generate MCQs |
| POST | /ai/generate/qa | Generate Q&A |
| GET | /ai/mcq/:pdfId | Get MCQs |
| GET | /ai/qa/:pdfId | Get Q&A |
```

---

### 👤 User Routes (`/api/user`)

```
| Method | Endpoint | Description |
|--------|--------|------------|
| GET | /user/me | Current user |
| PATCH | /user/me | Update profile |
| DELETE | /user/account | Delete account |
| PATCH | /user/plan/upgrade | Upgrade plan |
```

---

## 🌐 Frontend Repository

https://github.com/RanjanaRK/ai-question-generator-client.git

---

## 👨‍💻 Author

**Ranjana Kumari**
Full-Stack Developer (Next.js · Node.js · MongoDB · Express)

🔗 LinkedIn: https://www.linkedin.com/in/ranjanark/

🐙 GitHub: https://github.com/RanjanaRK

## 📄 License

This project is licensed under the **MIT License**.
