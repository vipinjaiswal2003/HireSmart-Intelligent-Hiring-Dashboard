# 💼 HireSmart – Intelligent Hiring Dashboard

### 🚀 Overview
**HireSmart** is a full-stack web application that automates candidate shortlisting using intelligent scoring.  
It analyzes hundreds of job applicants from a JSON dataset and identifies the **Top 5 candidates** based on **skills, experience, education, and diversity**.  
This project was developed as part of the **100B Jobs Challenge** by **Mercor**.

---

## 🧠 Problem Statement
Startups that have just raised capital often face the challenge of screening large volumes of applicants quickly.  
HireSmart solves this by automatically ranking candidates based on data-driven parameters — ensuring faster, fairer, and smarter hiring decisions.

---

## ⚙️ Tech Stack
| Category | Technologies Used |
|-----------|------------------|
| **Frontend** | React.js, Vite, JavaScript, HTML, CSS |
| **Backend** | Node.js, Express.js |
| **Data Handling** | JSON (form-submissions.json) |
| **Other Tools** | CORS, File System (fs), Path, Vite Dev Server |

---

## 🧩 Features
- 📊 **Automatic Top-5 Candidate Selection** – instantly displays the most qualified profiles.  
- 🧠 **Smart Scoring System** – evaluates candidates using a weighted formula.  
- 🧾 **Real-Time Data Processing** – reads and parses JSON data dynamically.  
- 🌐 **Full REST API Integration** – frontend and backend communicate seamlessly.  
- 🖥️ **Responsive Dashboard** – clean, dark-themed UI for easy visualization.  
- ⚡ **No Database Required** – works completely offline with JSON data.  

---

## 🔢 Scoring Logic
Each candidate is evaluated using a custom weighted scoring formula:


---

## 💻 How to Run the Project
```bash
1️⃣ Clone the Repository
git clone https://github.com/vipinjaiswal2003/HireSmart-100BJobs.git
cd HireSmart

2️⃣ Run the Backend
cd backend
npm install
npm start
✅ Backend running at: http://localhost:4000

3️⃣ Run the Frontend
cd frontend
npm install
npm run dev
✅ Frontend running at: http://localhost:5173
