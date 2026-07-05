function TransactionForm({
  description,
  amount,
  type,
  category,
  categories,
  onDescriptionChange,
  onAmountChange,
  onTypeChange,
  onCategoryChange,
  onSubmit,
}) {
  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
        <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
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
