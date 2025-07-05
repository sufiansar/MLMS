# 📚 Minimal Library Management System (MLMS)


**Minimal Library Management System (MLMS)** is a complete full-stack web application that allows users to manage a library of books and borrowing records. It uses the MERN stack with **TypeScript** and includes real-world features like book CRUD operations, borrowing logic with availability control, and a modular backend architecture.

---


- [🎯 Project Overview](https://mlms-rust.vercel.app)


## 🎯 Project Overview

**MLMS** (Minimal Library Management System) is designed to manage books and borrowing records efficiently. It includes:

- CRUD operations for books
- Book availability check before borrowing
- Borrow history summary
- Real-time updates using **Redux Toolkit Query**

---


## ✨ Features

### 🖥️ Frontend

- ⚛️ Built with React and Vite
- 🔄 State management using Redux Toolkit & RTK Query
- 🌐 Responsive UI (mobile-first) with TailwindCSS & ShadCN
- 📖 View books, details, availability
- 📝 Add / Edit / Delete books
- 📦 Borrow books with dynamic stock check
- 🔗 Clean routing and modular components

### 🗄️ Backend

- ⚙️ Built with Express.js and TypeScript
- 🧩 Modular structure: routes, controllers, services
- ✅ Input validation using **Mongoose validation** (no Zod)
- 📊 Business logic separated from route logic
- 📃 Borrow summary via MongoDB aggregation
- 🧠 Custom error classes and centralized error handler

---


### 🔁 Basic Flow

1. User loads book list from `/api/books`
2. User Also adds/edits/deletes books via POST/PUT/DELETE
3. Borrowing triggers stock check, updates copies
4. `/api/borrow-summary` aggregates borrow data

---

## 🧰 Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React, TypeScript, Vite        |
| UI          | TailwindCSS, ShadCN UI         |
| State Mgmt  | Redux Toolkit, RTK Query       |
| Backend     | Node.js, Express, TypeScript   |
| Database    | MongoDB with Mongoose          |
| Validation  | Mongoose Schema Validation     |
| Deployment  | Vercel (Frontend), Render (Planned Backend) |

---



## Sample Usage: Add & Borrow a Book

This section demonstrates how to add a book and borrow it using the MLMS API.



###  1. Add a New Book

**Endpoint:**

```http
POST /api/books
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Non-Fiction",
  "isbn": "9780735211292",
  "description": "An easy & proven way to build good habits and break bad ones.",
  "copies": 5,
  "available": true
}
```
**Description:**

This request adds a new book titled "Atomic Habits" to the library.

available should be true if copies > 0.

createdAt and updatedAt will be handled automatically by the backend.

---


```
POST /api/borrow/68563a984146378401c25440
{
  "book": "68563a984146378401c25440",
  "quantity": 5,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

```
If copies > 0, the book will be borrowed and:
copies will decrease by 1
available will be updated if copies reach 0
A borrow record will be created

**Sample Success Response:**
```
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64f8c1ab4fbd33944c5aab32",
    "bookId": "64f8c08f3e1c7a8e0d76a12a",
    "borrowerName": "Abdullah",
    "date": "2025-07-05T12:05:00.000Z"
  }
}
```



The **Minimal Library Management System (MLMS)** demonstrates how to build a modern, full-stack TypeScript application using scalable, modular architecture. It combines a powerful Express backend with a responsive React frontend and seamless state management via Redux Toolkit Query.

This project is ideal for:

- 📚 Educational institutions managing books and borrowing records
- 👨‍💻 Developers learning full-stack development with TypeScript
- ⚙️ Practicing REST API design, frontend integration, and real-world business logic







