import React, { useState } from "react";
import Transaction from "./Transaction";

function TransactionsList({ transaction, search, setTransactionsList }) {
  const [sortStrategy, setSortStrategy] = useState({
    description: -1,
    category: -1,
  });

  const filteredTransactions = transaction.filter((item) => {
    return (
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
  });

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

  function updateSortStrategy(item) {
    setSortStrategy((prevState) => ({
      ...prevState,
      [item]: prevState[item] * -1,
    }));
  }

  function sortTransactionList(event) {
    const sortBy = event.target.textContent.toLowerCase();
    updateSortStrategy(sortBy);

    let transactionsCopy = [...transaction];

    if (sortBy === "category" || sortBy === "description") {
      transactionsCopy.sort((a, b) => {
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();

        if (aValue < bValue) {
          return sortStrategy[sortBy];
        } else if (aValue > bValue) {
          return -sortStrategy[sortBy];
        } else {
          return 0;
        }
      });
    }

    setTransactionsList(transactionsCopy);
  }

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
        {listItems}
      </tbody>
    </table>
  );
}

export default TransactionsList;
