export function calculateIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateBalance(transactions) {
  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);
 return income - expenses;
}

export function highestSpendingCategory(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const totals = {};

  expenses.forEach((t) => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  });

  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
}

export function sortTransactions(transactions, key, direction) {
  return [...transactions].sort((a, b) => {
    if (key === "amount") {
      return direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }

    if (key === "date") {
      return direction === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }

    return 0;
  });
}
