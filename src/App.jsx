import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Summary from "./Summary";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const CATEGORIES = [
  "food",
  "housing",
  "utilities",
  "transport",
  "entertainment",
  "salary",
  "other",
];

function App() {
  const [theme, setTheme] = useState("dark");
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
      type: "income",
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
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    document.body.dataset.theme = theme;
    document.body.style.colorScheme = theme;
  }, [theme]);

  const filteredTransactions = useMemo(() => {
    let nextTransactions = transactions;

    if (filterType !== "all") {
      nextTransactions = nextTransactions.filter((t) => t.type === filterType);
    }

    if (filterCategory !== "all") {
      nextTransactions = nextTransactions.filter(
        (t) => t.category === filterCategory,
      );
    }

    return nextTransactions;
  }, [transactions, filterType, filterCategory]);

  const recentExpenses = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-2);
  }, [transactions]);

  const spendingInsight = useMemo(() => {
    if (recentExpenses.length < 2) {
      return "Add another expense to unlock trend insight";
    }

    const [previousExpense, latestExpense] = recentExpenses;
    const baseline = Math.max(previousExpense.amount, 1);
    const percentChange =
      ((latestExpense.amount - previousExpense.amount) / baseline) * 100;

    if (Math.abs(percentChange) < 1) {
      return "Spending velocity steady across your latest entries";
    }

    const direction = percentChange > 0 ? "up" : "down";
    return `Spending ${Math.abs(percentChange).toFixed(0)}% ${direction} vs previous expense`;
  }, [recentExpenses]);

  const handleSubmit = ({ description, amount, type, category }) => {
    const trimmedDescription = description.trim();
    const parsedAmount = Number.parseFloat(amount);

    if (
      !trimmedDescription ||
      !Number.isFinite(parsedAmount) ||
      parsedAmount <= 0
    )
      return;

    const newTransaction = {
      id: crypto.randomUUID(),
      description: trimmedDescription,
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString().split("T")[0],
    };

    setTransactions((currentTransactions) => [
      ...currentTransactions,
      newTransaction,
    ]);
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

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app" data-theme={theme}>
      <header className="app-header">
        <div className="app-copy">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">
              <span className="brand-mark__dot" />
              <span className="brand-mark__bar brand-mark__bar--tall" />
              <span className="brand-mark__bar brand-mark__bar--mid" />
              <span className="brand-mark__bar brand-mark__bar--short" />
            </div>

            <div>
              <p className="eyebrow">Personal finance dashboard</p>
              <h1>Finance Tracker</h1>
              <p className="subtitle">Track your income and expenses</p>
              <p className="insight-chip">
                <span className="insight-chip__dot" aria-hidden="true" />
                {spendingInsight}
              </p>
            </div>
          </div>
        </div>

        <div className="app-actions">
          <div className="app-badge" aria-label="Live ledger status">
            Live ledger
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <span className="theme-toggle__icon" aria-hidden="true">
              {theme === "dark" ? "☾" : "☼"}
            </span>
            <span>{theme === "dark" ? "Dark theme" : "Light theme"}</span>
          </button>
        </div>
      </header>

      <div className="aurora-band" aria-hidden="true" />

      <Summary transactions={transactions} />

      <TransactionForm categories={CATEGORIES} onSubmit={handleSubmit} />

      <TransactionList
        transactions={filteredTransactions}
        categories={CATEGORIES}
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
