import React from 'react';

function Transaction({ transactionItem, setTransactionsList }) {
  // Destructuring transactionItem to get its properties
  const { date, description, category, amount, id } = transactionItem;

  // Function to handle deletion of transaction
  function handleDelete(event) {
    // Sending a DELETE request to the server to delete the transaction with the given id
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      // Parsing the response as JSON
      .then((result) => result.json())
      // Once the deletion is successful, updating the transactions list in the state
      .then(() => {
        console.log("Item deleted!");
        // Filtering out the deleted transaction from the transactions list
        setTransactionsList((prevTransactions) =>
          prevTransactions.filter((item) => item.id !== id)
        );
      });
  }

  // Rendering the transaction item
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      {/* Button to trigger the handleDelete function */}
      <td>
        <button onClick={handleDelete}>Delete Transaction</button>
      </td>
    </tr>
  );
}

export default Transaction;

