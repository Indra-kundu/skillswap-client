# 🚀 SkillSwap — Freelance Micro-Task Platform

SkillSwap is a robust, full-stack micro-task marketplace designed to bridge the gap between clients and freelancers. It facilitates seamless task posting, proposal bidding, secure payments, and role-based dashboard management.

## 🔗 Live Project
[View Live Site](https://skillswap-client-six.vercel.app)


## 🛠 Tech Stack
* **Frontend:** React, Next.js (App Router), Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** BetterAuth (Credential + Google OAuth)
* **Payments:** Stripe Checkout
* **Deployment:** Vercel

## ✨ Key Features
* **Role-Based Dashboards:** Dedicated portals for Clients, Freelancers, and Admins.
* **Smart Marketplace:** Real-time task filtering, category-based browsing, and server-side pagination.
* **Secure Payments:** Stripe-integrated payment flow with secure backend session confirmation.
* **CRUD Operations:** Dynamic management of tasks and proposals with real-time status updates.
* **Authentication:** Robust security using JWT, HTTPOnly cookies, and role-based middleware protection.
* **Responsive UI:** Modern, clean, and fully responsive design optimized for all devices.

## 🔐 Test Credentials
| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin1@taskhive.com` | `admin1@taskhive.com` |
| **Freelancer** | `freelanceruser3@gmail.com` | `freelanceruser3@gmail.com` |

## ⚙️ How to Run Locally
**Clone the repositories:**
1. Install dependencies:npm install
2. Environment Variables:Create a .env.local file in the client and .env in the server directory. Add your MONGODB_URI, STRIPE_SECRET_KEY, GOOGLE_CLIENT_ID, and BETTER_AUTH_SECRET.
3. Run the project:npm run dev
   
   
