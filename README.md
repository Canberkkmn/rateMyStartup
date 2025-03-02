# 🚀 RateMyStartup

RateMyStartup is a platform for reviewing and rating startups. Users can browse startups, add new ones, and vote on existing startups.

## 📌 Features

- 🔍 **Startup Listing:** Displays all registered startups from PostgreSQL.
- ➕ **Add Startup:** Users can submit new startups.
- ⭐ **Vote on Startups:** Users can rate startups from 1 to 5 stars.
- 🔄 **Real-time Updates:** Instant UI updates after voting or adding startups.
- 🗃 **Persistent Database:** Data is stored using PostgreSQL.

---

## 🛠 Technologies Used

- [Next.js](https://nextjs.org/) - React-based web framework
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Tailwind CSS](https://tailwindcss.com/) - UI styling
- [PostgreSQL](https://www.postgresql.org/) - Persistent database
- [Prisma](https://www.prisma.io/) - ORM & database management
- [Redux](https://redux.js.org) - Global State management

---

## 🚀 Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/ratemystartup.git
cd ratemystartup
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start PostgreSQL and Create Database

If PostgreSQL is not installed, install it and then run:

```sh
psql -U postgres
CREATE DATABASE ratemystartup;
```

### 4️⃣ Configure .env File

📂 **Create a `.env` file in the root directory and add:**

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/ratemystartup"
```

### 5️⃣ Migrate Database Schema with Prisma

```sh
npx prisma migrate dev --name init
```

### 6️⃣ Start the Server

```sh
npm run dev
```

🔹 **Project will run at `http://localhost:3001`.**

---

## 🔥 API Usage

### **1️⃣ Get All Startups**

```
GET /api/startups
```

📌 **Sample Response:**

```json
[
  {
    "id": "1",
    "name": "TechX",
    "description": "AI-powered technology startup.",
    "rating": 4.8,
    "votes": 10
  }
]
```

### **2️⃣ Add a New Startup**

```
POST /api/startups
```

📌 **Request Body:**

```json
{
  "name": "AI Startup",
  "description": "A startup focused on AI solutions."
}
```

📌 **Successful Response:**

```json
{
  "id": "2",
  "name": "AI Startup",
  "description": "A startup focused on AI solutions.",
  "rating": 0,
  "votes": 0
}
```

### **3️⃣ Vote on a Startup**

```
PATCH /api/startups/:id
```

📌 **Request Body:**

```json
{
  "id": "1",
  "rating": 5
}
```

📌 **Successful Response:**

```json
{
  "id": "1",
  "name": "TechX",
  "description": "AI-powered technology startup.",
  "rating": 4.9,
  "votes": 11
}
```

---

## 📸 Screenshots

📌 **Home Page:** Startup listing

📌 **Add Startup Page:** Form to submit a new startup

📌 **Startup Detail Page:** Voting and startup details

---

## 🎯 Contributing

1. **Fork the repository** to your GitHub account.
2. Create a **new branch**:

```sh
git checkout -b new-feature
```

3. **Commit your changes**:

```sh
git commit -m "Added a new feature."
```

4. **Open a Pull Request and contribute!** 🚀

---

## 📜 License

MIT License © 2024 RateMyStartup

---

💡 **Want to contribute to RateMyStartup? Feel free to send a pull request!** 🚀
