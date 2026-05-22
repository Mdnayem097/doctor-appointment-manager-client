# 🏥 DocAppoint

DocAppoint is a modern Doctor Appointment Management System that allows users to browse doctors, view detailed information, and easily book online appointments. Users can also manage their bookings and update their profile.

---

## 🚀 Features

- 👨‍⚕️ Browse and search doctors  
- 📄 View detailed doctor profiles (experience, hospital, fee, availability)  
- 📅 Book appointments easily  
- 🧾 Manage (view, update, delete) appointments  
- 👤 User profile management  
- 🔐 Secure authentication system  

---

## 🧠 Project Goal

The main goal of this project is to build a simple, fast, and user-friendly healthcare appointment system where patients can easily find doctors and book appointments online.

---

## ⚙️ Tech Stack

- ⚛️ Next.js (Frontend)  
- 🟢 Node.js / Express (Backend)  
- 🍃 MongoDB (Database)  
- 🔐 Better Auth (Session-based Authentication)  
- 🔐 JWT (Token-based API Authorization)  
- 🎨 Tailwind CSS (UI Design)  

---

## 📱 Application Flow

1. User registers / logs in using Better Auth  
2. Session is managed via Better Auth  
3. JWT token is used for secure API requests  
4. Browse doctor list  
5. View doctor details  
6. Book appointment  
7. Manage appointments & profile  

---

## 🔐 Authentication System

### 🔹 Better Auth (Session Management)
- Handles login/logout  
- Manages user sessions securely  
- Integrated with Next.js frontend  

### 🔹 JWT (API Security)
- Secures backend API routes  
- Passed via Authorization header  
- Used for verifying protected requests  

---

### ⚠️ Challenges & Deployment Issue

During the development of this project, I faced a major deployment challenge.

Although the application worked perfectly in the local development environment, the site started crashing after deploying to Vercel. The production environment behaved differently from localhost, and authentication-related features were not functioning correctly.

I spent nearly 10 hours debugging the issue and researching possible solutions. Eventually, I identified that the issue was related to DNS/network resolution during the authentication process.

### 🛠️ Solution

To resolve the issue, I added custom DNS configuration inside the client-side auth.js setup using Node.js DNS module:

- import dns from "node:dns";

- dns.setServers(["8.8.8.8", "8.8.4.4"]);

After pushing this fix and redeploying the project on Vercel, the application started working correctly in the production environment.

---

## 🌐 Live Demo

- 👉 Live Site: https://doctor-appointment-manager-client.vercel.app

- 👉 Server Repo Link: https://github.com/Mdnayem097/doctor-appointment-manager-sarver

- 👉 Client Repo Link: https://github.com/Mdnayem097/doctor-appointment-manager-client

---

## 📞 Contact

- Email: mdneloy097@gmail.com 
- GitHub: https://github.com/Mdnayem097

---

## ⭐ Support

If you find this project helpful or interesting, feel free to ⭐ star the repository.
Your support helps me stay motivated and continue building more real-world projects.
