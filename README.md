# **Fitpage Assignment – Product Rating & Review App**

**Build a full-stack web application that allows users to submit ratings and reviews on products.**

---

## **📝 Features**

* Submit **ratings**, **reviews**, or both.
* View **average rating** and **total reviews** per product.
* Upload **photos** in reviews.
* Prevent **duplicate reviews** by using the user’s **IP address**.
* Real-time UI updates for new reviews and stats.

---

## **🌐 Hosted URLs**

* 🔗 **Frontend**: [https://uifitpage.satyamjha.me](https://uifitpage.satyamjha.me)
* 🔗 **Backend**: [https://apifitpage.satyamjha.me](https://apifitpage.satyamjha.me)
* 🚀 **Backend Hosting**: EC2 (with NGINX reverse proxy)
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
├── utils/ → fileUploader.js (uploads photos to Supabase)
├── prisma/ → schema.prisma, prismaClient.js
└── server.js
```

---

## **📡 API Endpoints**

**Base URL**: `https://apifitpage.satyamjha.me`

* `POST /api/review` → Submit rating/review/photo
  *(IP address auto-tracked to avoid duplicate entries per product)*
* `GET /user/getuser` → Get user by username

---

## **🧪 Tech Stack**

* **Frontend**: React, Vite, TailwindCSS
* **Backend**: Express.js, Prisma
* **Database**: PostgreSQL (via **Supabase**)
* **Media Storage**: Supabase Buckets
* **Hosting**: Vercel (frontend), AWS EC2 (backend)

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

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_postgres_connection_string
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_project_url
```

Then:

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

Place this in `/server/.env.example` for sharing:

```env
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<db>
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=https://<project>.supabase.co
```