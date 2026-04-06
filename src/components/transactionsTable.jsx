import { useState } from "react";
import { sortTransactions } from "./functions";

export default function TransactionTable({ transactions }) {

  const [sortKey, setSortKey] = useState("date");
  const [direction, setDirection] = useState("asc");

  function handleSort(key) {

    const newDirection = direction === "asc" ? "desc" : "asc";

    setSortKey(key);
    setDirection(newDirection);
  }

  const sortedTransactions = sortTransactions(transactions, sortKey, direction);

  return (
    <div>

      {/* SORT BUTTONS */}

      <div className="sortButtons">

        <span>Sort By:</span>

        <button onClick={() => handleSort("date")}>
          Date {sortKey === "date" ? (direction === "asc" ? "↑" : "↓") : ""}
        </button>

        <button onClick={() => handleSort("amount")}>
          Amount {sortKey === "amount" ? (direction === "asc" ? "↑" : "↓") : ""}
        </button>

      </div>

      {/* TABLE */}

      <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>

          {sortedTransactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}