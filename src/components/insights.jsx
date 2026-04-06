import { highestSpendingCategory } from "../components/functions";

export default function Insights({ transactions }) {

  const highest = highestSpendingCategory(transactions);

  const expenses = transactions.filter(t => t.type === "expense");

  const monthlySpending = {};

  expenses.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });

    monthlySpending[month] =
      (monthlySpending[month] || 0) + t.amount;
  });

  const data = Object.entries(monthlySpending);

  const max = Math.max(...data.map(d => d[1]), 1);

  return (
    <div className="insights">

      <h2>Insights</h2>

      {highest && (
        <p>
          Highest spending category: <b>{highest[0]}</b> (₹{highest[1]})
        </p>
      )}

      <h3>Monthly Spending</h3>

      <div className="graph">

        {data.map(([month, amount]) => (

          <div key={month} className="barContainer">

            <div
              className="bar"
              style={{ height: `${(amount / max) * 150}px` }}
            ></div>

            <span>{month}</span>

          </div>

        ))}

      </div>

    </div>
  );
}