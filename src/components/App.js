import React from "react";
import AccountContainer from "./AccountContainer"; // Importing AccountContainer component

function App() {
  return (
    <div className="ui raised segment">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Flatiron</h2> {/* Title */}
      </div>
      <AccountContainer /> {/* Rendering AccountContainer component */}
    </div>
  );
}

export default App;

