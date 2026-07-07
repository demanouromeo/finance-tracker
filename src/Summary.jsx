import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = [
  "#2f4f4f",
  "#1b7f79",
  "#c07f00",
  "#b23a48",
  "#355070",
  "#6a4c93",
  "#0081a7",
];

function Summary({ transactions }) {
  const [chartType, setChartType] = useState("pie");

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const expenseByCategory = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((totalsByCategory, transaction) => {
      const currentTotal = totalsByCategory[transaction.category] ?? 0;
      return {
        ...totalsByCategory,
        [transaction.category]: currentTotal + transaction.amount,
      };
    }, {});

  const spendingData = Object.entries(expenseByCategory).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  const formatMoney = (value) => `$${value.toFixed(2)}`;

  return (
    <div className="summary">
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Income</h3>
          <p className="income-amount">{formatMoney(totalIncome)}</p>
        </div>
        <div className="summary-card">
          <h3>Expenses</h3>
          <p className="expense-amount">{formatMoney(totalExpenses)}</p>
        </div>
        <div className="summary-card">
          <h3>Balance</h3>
          <p className="balance-amount">{formatMoney(balance)}</p>
        </div>
      </div>

      <div className="summary-chart">
        <h2>Spending by Category</h2>
        {spendingData.length === 0 ? (
          <p className="empty-chart">No expenses to visualize yet.</p>
        ) : (
          <>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={280}>
                {chartType === "pie" ? (
                  <PieChart>
                    <Pie
                      data={spendingData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                    >
                      {spendingData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatMoney(value)} />
                    <Legend />
                  </PieChart>
                ) : (
                  <BarChart
                    data={spendingData}
                    margin={{ top: 10, right: 24, left: 4, bottom: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => formatMoney(value)} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {spendingData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            <div
              className="chart-toggle"
              role="group"
              aria-label="Chart type toggle"
            >
              <button
                type="button"
                className={
                  chartType === "pie" ? "toggle-btn active" : "toggle-btn"
                }
                onClick={() => setChartType("pie")}
              >
                Pie Chart
              </button>
              <button
                type="button"
                className={
                  chartType === "bar" ? "toggle-btn active" : "toggle-btn"
                }
                onClick={() => setChartType("bar")}
              >
                Bar Chart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Summary;
