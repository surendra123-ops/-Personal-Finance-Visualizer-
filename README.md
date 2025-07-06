

## 🧾 Personal Finance Visualizer

A modern, responsive web application to **track expenses**, **set budgets**, and **visualize personal financial data** through intuitive charts and dashboards.

---

### 🚀 Live Preview

> Deploy link : https://personal-finance-visualizer-1-frontend.onrender.com/

---

## 📦 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Framer Motion, Lucide Icons, Recharts
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Charting:** Recharts
* **UI Enhancements:** `shadcn/ui`, `Framer Motion` for animations


---

## 📁 Project Structure

```
├── client/
│   ├── components/      // Reusable UI Components (AddTransactionForm, ExpenseChart, etc.)
│   ├── pages/           // Main pages (Dashboard, Budget, History)
│   └── App.jsx          // Root component
│
├── server/
│   ├── controllers/     // Route logic
│   ├── routes/          // API endpoints
│   └── models/          // Mongoose models
│
└── README.md
```

---

## ✅ Stage-wise Features

### 🟩 Stage 1: Basic Transaction Tracking

* ➕ Add transactions (amount, date, description)
* 🗑️ Delete and view transactions
* 📊 Monthly **bar chart** for total expenses
* 📋 Transaction list with date filter
* ✅ Form validations & date limits based on selected month
* 🌓 Responsive UI with light/dark mode support

### 🟦 Stage 2: Category Management

* 🏷️ Predefined categories: Food, Bills, Transport, etc.
* 🧮 Assign category when adding a transaction
* 🥧 Category-wise expense breakdown (planned as pie chart)
* 📅 Month-based filtering for both charts and lists

### 🟨 Stage 3: Budget Tracking (Completed)

* 📌 Set a monthly budget per category
* 📉 Compare **budget vs actual spending** per category
* 📈 Chart: Bar comparison of Budget vs Actual by category
* 🛑 Alerts (in upcoming stages) if actual spending > budget

> ✅ All charts dynamically respond to the selected month

---





## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/personal-finance-visualizer.git
cd personal-finance-visualizer
```

### 2. Setup Backend (Node.js + Express + MongoDB)

```bash
cd server
npm install
# Create .env file and add:
# MONGODB_URI=<your_mongodb_connection>
# PORT=5000

npm run dev
```

### 3. Setup Frontend (React + Tailwind + Recharts)

```bash
cd client
npm install
npm run dev
```

> 📝 Make sure both backend and frontend run on separate ports.

---

## 🧪 API Endpoints (Sample)

### 🔁 Transactions

| Method | Endpoint                          | Description               |
| ------ | --------------------------------- | ------------------------- |
| GET    | `/api/transactions?month=YYYY-MM` | Get transactions by month |
| POST   | `/api/transactions`               | Add a new transaction     |
| DELETE | `/api/transactions/:id`           | Delete a transaction      |

### 💸 Budgets

| Method | Endpoint                     | Description                 |
| ------ | ---------------------------- | --------------------------- |
| GET    | `/api/budgets?month=YYYY-MM` | Get budgets for month       |
| POST   | `/api/budgets`               | Set monthly category budget |

---



---

## 👨‍💻 Developer

**Surendra Yenika**


---


