import { useState } from "react";
import TransactionTable from "./transactionsTable";
import {
  calculateIncome,
  calculateExpenses,
  calculateBalance
} from "./functions";

export default function Transactions({ transactions, setTransactions, role }) {

  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);
  const balance = calculateBalance(transactions);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    date:"",
    amount:"",
    category:"",
    type:""
  });

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value});
  }

  function addTransaction(e){
    e.preventDefault();

    const newTransaction={
      id:Date.now(),
      date:form.date,
      amount:Number(form.amount),
      category:form.category,
      type:form.type
    };

    setTransactions(prev=>[...prev,newTransaction]);

    setForm({
      date:"",
      amount:"",
      category:"",
      type:""
    });

    setShowForm(false);
  }

  return(
    <div>

      <h2>Transactions</h2>

      {/* BALANCE / INCOME / EXPENSE CARDS */}

      <div className="cards">

        <div className="card">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>

        <div className="card">
          <h3>Income</h3>
          <p>₹{income}</p>
        </div>

        <div className="card">
          <h3>Expenses</h3>
          <p>₹{expenses}</p>
        </div>

      </div>

      {/* ADD TRANSACTION BUTTON */}

      {role==="admin" && (
        <button onClick={()=>setShowForm(true)}>
          Add Transaction
        </button>
      )}

      {/* MODAL POPUP FORM */}

      {showForm && (
        <div className="modalOverlay">

          <div className="modal">

            <h3>Add Transaction</h3>

            <form className="modalForm" onSubmit={addTransaction}>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                required
              />

              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <div className="formButtons">
                <button type="submit">Save</button>
                <button type="button" onClick={()=>setShowForm(false)}>
                  Cancel
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

      {/* TRANSACTIONS TABLE */}

      <TransactionTable transactions={transactions}/>

    </div>
  );
}