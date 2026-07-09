import { useState } from "react";

function TransactionForm({ categories, onSubmit }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(categories[0] ?? "other");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ description, amount, type, category });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory(categories[0] ?? "other");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="transaction-description">Description</label>
        <input
          id="transaction-description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="transaction-amount">Amount</label>
        <input
          id="transaction-amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor="transaction-type">Type</label>
        <select
          id="transaction-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="transaction-category">Category</label>
        <select
          id="transaction-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
