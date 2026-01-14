# 🚀 GigFlow – Freelance Marketplace (MERN Stack)

GigFlow is a full-stack freelance marketplace where users can post gigs, place bids, and hire freelancers.  
Built as part of an internship assignment with focus on **real-world backend rules, clean UI, and data consistency**.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## ✨ Features Implemented

### ✅ Authentication
- User registration & login
- JWT-based protected routes

### ✅ Gigs
- Create gigs
- View all open gigs
- Search gigs by title
- Gig status: `open` → `assigned`

### ✅ Bidding System
- Place a bid on a gig
- Only **one bid per user per gig**
- Gig owner **cannot bid** on own gig
- Cannot bid on **assigned gigs**
- Bid status:
  - `pending`
  - `hired`
  - `rejected`

### ✅ Hiring Logic (Bonus ⭐)
- Hire a freelancer for a gig
- Uses **MongoDB transactions**
- Ensures atomic updates:
  - Gig marked assigned
  - One bid marked hired
  - All other bids rejected

### ✅ UI/UX
- Clean, responsive UI
- Status-based colors
- Disabled actions when not allowed
- Clear success & error feedback

---

## 🧠 Business Rules Enforced (Backend)

- Duplicate bids are blocked
- Owner-only access to hire
- Assigned gigs are locked
- Backend validation even if UI is bypassed

---

## 🏃‍♂️ How to Run Locally

### 1️⃣ Clone the repo
```bash
git clone <your-repo-url>
cd GigFlow
