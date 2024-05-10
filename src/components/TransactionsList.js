import React, { useState } from "react";
import Transaction from "./Transaction";

// Function component for displaying a list of transactions
function TransactionsList({ transaction, search, setTransactionsList }) {
  // State to manage sorting strategy
  const [sortStrategy, setSortStrategy] = useState({
    description: -1, // Default sorting order for description column
    category: -1,    // Default sorting order for category column
  });

  // Filter transactions based on search query
  const filteredTransactions = transaction.filter((item) => {
    return (
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Map filtered transactions to Transaction components
  let listItems;
  listItems = filteredTransactions.map((item) => {
    return (
      <Transaction
        key={item.id}
        transactionItem={item}
        setTransactionsList={setTransactionsList}
      />
    );
  });

  // Function to update sort strategy
  function updateSortStrategy(item) {
    setSortStrategy((prevState) => ({
      ...prevState,
      [item]: prevState[item] * -1, // Toggle sorting order (-1 or 1)
    }));
  }

  // Function to sort transaction list based on clicked column
  function sortTransactionList(event) {
    const sortBy = event.target.textContent.toLowerCase(); // Get column to sort by
    updateSortStrategy(sortBy); // Update sorting strategy

    let transactionsCopy = [...transaction]; // Copy transactions array

    if (sortBy === "category" || sortBy === "description") {
      transactionsCopy.sort((a, b) => {
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();

        if (aValue < bValue) {
          return sortStrategy[sortBy]; // Sort based on sorting strategy
        } else if (aValue > bValue) {
          return -sortStrategy[sortBy]; // Sort based on sorting strategy
        } else {
          return 0;
        }
      });
    }

    setTransactionsList(transactionsCopy); // Set sorted transactions list
  }

  // Render the transactions table
  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.10)",
              cursor: "pointer",
            }}
          >
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.10)",
              cursor: "pointer",
            }}
          >
            <h3
              className="ui center aligned header"
              onClick={sortTransactionList}
              title="click to sort by description"
            >
              Description
            </h3>
          </th>
          <th
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.10)",
              cursor: "pointer",
            }}
          >
            <h3
              className="ui center aligned header"
              onClick={sortTransactionList}
              title="click to sort by category"
            >
              Category
            </h3>
          </th>
          <th
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.10)",
              cursor: "pointer",
            }}
          >
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        {listItems} {/* Render the list of transactions */}
      </tbody>
    </table>
  );
}

export default TransactionsList;

