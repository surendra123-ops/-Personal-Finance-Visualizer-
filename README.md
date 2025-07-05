


## 📘 Personal Finance Visualizer

A simple web app to track your personal income/expenses with charts and edit/delete functionality.

---

### 🚀 Live Demo

* **Frontend (React + Tailwind)**:
  👉 [https://personal-finance-visualizer-1-frontend.onrender.com](https://personal-finance-visualizer-1-frontend.onrender.com)

* **Backend (Node.js + Express + MongoDB Atlas)**:
  👉 [https://personal-finance-visualizer-gdzq.onrender.com](https://personal-finance-visualizer-gdzq.onrender.com)

---

### 🛠 Tech Stack

| Layer      | Tech Used                    |
| ---------- | ---------------------------- |
| Frontend   | React.js, Tailwind CSS, Vite |
| Backend    | Node.js, Express.js          |
| Database   | MongoDB Atlas                |
| Charting   | Recharts                     |
| Deployment | Render (Frontend & Backend)  |

---

### 📂 Project Structure

```
finance-app/
├── backend/
│   ├── server.js
│   ├── models/Transaction.js
│   └── routes/transactions.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTransactionForm.jsx
│   │   │   ├── TransactionList.jsx
│   │   │   ├── EditTransactionModal.jsx
│   │   │   └── ExpenseChart.jsx
│   │   ├── services/api.js
│   │   └── App.jsx
│   ├── .env
│   └── vite.config.js
```

---

### ⚙️ Features

* ✅ Add transactions with amount, description, and date
* ✅ View all transactions in a list
* ✅ Edit or delete existing transactions
* ✅ Bar chart to visualize monthly expenses
* ✅ Fully responsive design
* ✅ Persistent data using MongoDB Atlas

---

### 🧪 Local Setup Instructions

#### ✅ Clone Repository

```bash
git clone https://github.com/surendra123-ops/-Personal-Finance-Visualizer-.git
cd personal-finance-visualizer
```

---

#### 📦 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<your-db-uri>
```

Start server:

```bash
node server.js
```

---

#### 💻 Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:4000
```

Start dev server:

```bash
npm run dev
```

---

### 🚀 Deployment Guide (Render)

#### ✅ Backend on Render

1. Go to [https://render.com](https://render.com)
2. Create new **Web Service**
3. Link to GitHub backend folder
4. Set environment variables:

   * `PORT = 4000`
   * `MONGODB_URI = your-mongodb-uri`
5. Set build command: `npm install`
6. Start command: `node server.js`

---

#### ✅ Frontend on Render

1. Create another **Web Service**
2. Link to GitHub frontend folder
3. Set environment variable:

   * `VITE_API_URL = https://<your-backend-app>.onrender.com`
4. Build command: `npm install && npm run build`
5. Publish directory: `dist`

---



### ✍️ Author

**Surendra Yenika**
🌐 [LinkedIn](https://www.linkedin.com/in/surendra-yenika/)

