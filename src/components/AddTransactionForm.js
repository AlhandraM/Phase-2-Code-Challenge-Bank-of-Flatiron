import React, { useState } from "react";

function AddTransactionForm({ handleSubmit }) {
  // State to manage form data
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  // Function to handle form submission
  function onSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    // Send POST request to server with form data
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json()) // Parse response JSON
      .then((newTransaction) => {
        handleSubmit(newTransaction); // Pass new transaction data to parent component
        console.log(formData); // Log form data to console (for debugging)
        // Reset form data after successful submission
        setFormData({
          date: "",
          description: "",
          category: "",
          amount: "",
        });
      });
  }

  // Function to update form data as user types
  function handleChange(e) {
    const { name, value } = e.target;
    // Update only the changed field in formData state
    setFormData({ ...formData, [name]: value });
  }

  // Render the form
  return (
    <div className="ui segment">
      <form onSubmit={onSubmit} className="ui form">
        <div className="inline fields">
          {/* Date input */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {/* Description input */}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          {/* Category input */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          {/* Amount input */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        {/* Submit button */}
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;

