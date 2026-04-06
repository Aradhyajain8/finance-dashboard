import { useState } from "react";
import { initialTransactions } from "./components/transactions";
import Transactions from "./components/summary";
import Insights from "./components/insights";
import "./App.css";

export default function App() {

  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("viewer");

  return (
    <div className="container">

      <h1>Finance Dashboard</h1>

      {/* ROLE SWITCH */}
      <div className="roleSwitch">
        <label>Role: </label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <Transactions
        transactions={transactions}
        setTransactions={setTransactions}
        role={role}
      />

      <Insights transactions={transactions} />

    </div>
  );
}