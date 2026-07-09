import { formatCurrency } from "./utils/currency";

function TransactionList({
  transactions,
  categories,
  filterType,
  filterCategory,
  onFilterTypeChange,
  onFilterCategoryChange,
  onDelete,
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>
                <span
                  className="category-badge"
                  data-category={transaction.category}
                >
                  {transaction.category}
                </span>
              </td>
              <td
                className={
                  transaction.type === "income"
                    ? "income-amount"
                    : "expense-amount"
                }
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </td>
              <td>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDelete(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr className="empty-row">
              <td colSpan="5">
                No transactions match this filter — try clearing it.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
