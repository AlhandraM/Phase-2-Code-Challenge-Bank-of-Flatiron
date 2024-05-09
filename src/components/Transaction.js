function Transaction({ transactionItem, setTransactionsList }) {
  const { date, description, category, amount, id } = transactionItem;

  function handleDelete(event) {
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((result) => result.json())
      .then(() => {
        console.log("Item deleted!");
        setTransactionsList((prevTransactions) =>
          prevTransactions.filter((item) => item.id !== id)
        );
      });
  }

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button onClick={handleDelete}>Delete Transaction</button>
      </td>
    </tr>
  );
}
export default Transaction;
