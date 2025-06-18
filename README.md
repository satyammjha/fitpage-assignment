# **Fitpage Assignment – Product Rating & Review App**

**A full-stack web application that allows users to submit ratings and reviews on products with images, and see live aggregated results.**

---

## **📝 Features**

* Submit **ratings**, **reviews**, or both
* View **average rating** and **total reviews**
* Upload **photos** in reviews
* Prevent **duplicate reviews** using the user’s **IP address**
* Real-time UI updates on the frontend
* Basic **health check** route for uptime monitoring

---

## **🌐 Hosted URLs**

* 🔗 **Frontend**: [https://uifitpage.satyamjha.me](https://fitpageui.satyamjha.me/)
* 🔗 **Backend**: [https://apifitpage.satyamjha.me](https://apifitpage.satyamjha.me)
* 🚀 **Backend Hosting**: AWS EC2 (with NGINX reverse proxy)
* ⚡ **Frontend Hosting**: Vercel

---

## **📁 Folder Structure**

### **Client (Frontend – React + Tailwind + Vite)**

```
client/
├── src/
│   ├── components/
│   │   ├── productpage/ → ProductCard, Stats, StarRating, ReviewModal
│   │   └── shared/, ui/ → Common & reusable UI components
│   ├── pages/ → home.tsx, not-found/
│   ├── lib/ → api.ts (API service)
│   └── constants/, providers/, types/
```

### **Server (Backend – Express + Prisma + Supabase)**

```
server/
├── routes/ → review.routes.js, user.routes.js
├── controller/ → review.controller.js, user.controller.js
├── utils/ → fileUploader.js (handles Supabase image uploads)
├── prisma/ → schema.prisma, prismaClient.js
└── server.js
```

---

## **📡 API Endpoints**

**Base URL**: `https://apifitpage.satyamjha.me`

| Method | Endpoint        | Description                                        |
| ------ | --------------- | -------------------------------------------------- |
| POST   | `/api/review`   | Submit a rating, review, and optional image        |
| GET    | `/user/getuser` | Fetch user by IP                                   |
| GET    | `/health`       | Health check route for monitoring (returns 200 OK) |

> ⚠️ Duplicate reviews by the same user on the same product are blocked using IP address logging.

---

## **🧪 Tech Stack**

* **Frontend**: React, Vite, TailwindCSS
* **Backend**: Express.js, Prisma
* **Database**: PostgreSQL (via **Supabase**)
* **Media Storage**: Supabase Buckets
* **Hosting**: Vercel (frontend), AWS EC2 + NGINX (backend)

---

## **⚙️ Setup Instructions**

### 1. **Clone the Repository**

```bash
git clone https://github.com/satyammjha/fitpage-assignment.git
cd fitpage-assignment
```

---

### 2. **Set Up Backend**

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
DATABASE_URL=your_postgres_connection_string
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=https://your_project.supabase.co
```

Then run:

```bash
npx prisma db push
npm run dev
```

---

### 3. **Set Up Frontend**

```bash
cd client
npm install
npm run dev
```

---

## **📄 .env.example**

```env
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<db>
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=https://<project>.supabase.co
```

---

## **📬 Contact**

* **Email**: [satyammjha0@gmail.com](mailto:satyammjha0@gmail.com)
* **LinkedIn**: [linkedin.com/in/satyammjha](https://linkedin.com/in/satyammjha)

---
