function TransactionList({
  transactions,
  categories,
  filterType,
  filterCategory,
  onFilterTypeChange,
  onFilterCategoryChange,
}) {
  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select
          value={filterType}
          onChange={(e) => onFilterTypeChange(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => onFilterCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td
                className={
                  transaction.type === "income"
                    ? "income-amount"
                    : "expense-amount"
                }
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
