import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactionsList, setTransactionsList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactionsList(data);
      });
  }, []);

  function handleSubmit(newTransaction) {
    const updatedTransaction = [...transactionsList, newTransaction];
    setTransactionsList(updatedTransaction);
  }

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <AddTransactionForm handleSubmit={handleSubmit} />
      <TransactionsList
        transaction={transactionsList}
        search={search}
        setTransactionsList={setTransactionsList}
      />
    </div>
  );
}

export default AccountContainer;
