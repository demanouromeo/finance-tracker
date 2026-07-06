import { useState } from "react";
import "./App.css";
import Summary from "./Summary";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: "Salary",
      amount: 5000,
      type: "income",
      category: "salary",
      date: "2025-01-01",
    },
    {
      id: 2,
      description: "Rent",
      amount: 1200,
      type: "expense",
      category: "housing",
      date: "2025-01-02",
    },
    {
      id: 3,
      description: "Groceries",
      amount: 150,
      type: "expense",
      category: "food",
      date: "2025-01-03",
    },
    {
      id: 4,
      description: "Freelance Work",
      amount: 800,
      type: "expense",
      category: "salary",
      date: "2025-01-05",
    },
    {
      id: 5,
      description: "Electric Bill",
      amount: 95,
      type: "expense",
      category: "utilities",
      date: "2025-01-06",
    },
    {
      id: 6,
      description: "Dinner Out",
      amount: 65,
      type: "expense",
      category: "food",
      date: "2025-01-07",
    },
    {
      id: 7,
      description: "Gas",
      amount: 45,
      type: "expense",
      category: "transport",
      date: "2025-01-08",
    },
    {
      id: 8,
      description: "Netflix",
      amount: 15,
      type: "expense",
      category: "entertainment",
      date: "2025-01-10",
    },
  ]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = [
    "food",
    "housing",
    "utilities",
    "transport",
    "entertainment",
    "salary",
    "other",
  ];

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.type === filterType,
    );
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.category === filterCategory,
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split("T")[0], // .toISOString() converts it to a string like 2026-07-05T14:23:10.123Z (UTC time).
      //.split("T") breaks that string into ["2026-07-05", "14:23:10.123Z"].
      //[0] takes bonly the first part, Like "2026-07-05", which is the date in YYYY-MM-DD format.
    };

    setTransactions([...transactions, newTransaction]); //...transactions copies all existing items from the current transactions array. NewTransaction is added at the end
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!shouldDelete) return;

    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id),
    );
  };

  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <Summary transactions={transactions} />

      <TransactionForm
        description={description}
        amount={amount}
        type={type}
        category={category}
        categories={categories}
        onDescriptionChange={setDescription}
        onAmountChange={setAmount}
        onTypeChange={setType}
        onCategoryChange={setCategory}
        onSubmit={handleSubmit}
      />

      <TransactionList
        transactions={filteredTransactions}
        categories={categories}
        filterType={filterType}
        filterCategory={filterCategory}
        onFilterTypeChange={setFilterType}
        onFilterCategoryChange={setFilterCategory}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
