import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList"; // Importing TransactionsList component
import Search from "./Search"; // Importing Search component
import AddTransactionForm from "./AddTransactionForm"; // Importing AddTransactionForm component

function AccountContainer() {
  // Initializing state variables using useState hook
  const [transactionsList, setTransactionsList] = useState([]); // State variable for transactions list
  const [search, setSearch] = useState(""); // State variable for search input

  // useEffect hook to fetch initial data when component mounts
  useEffect(() => {
    fetch("http://localhost:8001/transactions") // Fetching transactions data from the server
      .then((res) => res.json()) // Parsing response as JSON
      .then((data) => {
        setTransactionsList(data); // Updating transactionsList state with fetched data
      });
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Function to handle form submission and add new transaction
  function handleSubmit(newTransaction) {
    const updatedTransaction = [...transactionsList, newTransaction]; // Creating a new array with the updated transaction list
    setTransactionsList(updatedTransaction); // Updating transactionsList state with the new transaction
  }

  // Rendering the components and passing necessary props
  return (
    <div>
      <Search search={search} setSearch={setSearch} /> {/* Rendering the Search component and passing props */}
      <AddTransactionForm handleSubmit={handleSubmit} /> {/* Rendering the AddTransactionForm component and passing handleSubmit prop */}
      <TransactionsList
        transaction={transactionsList} // Passing transactionsList state as prop
        search={search} // Passing search state as prop
        setTransactionsList={setTransactionsList} // Passing setTransactionsList function as prop
      /> {/* Rendering the TransactionsList component and passing props */}
    </div>
  );
}

export default AccountContainer; // Exporting AccountContainer component

