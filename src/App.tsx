import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionGrid from "./components/TransactionGrid";
import "./App.css";
const App: React.FC = () => {
  const [showGrid, setShowGrid] = useState(false);

  // Method to show the TransactionGrid
  const handleViewTransactions = () => {
    setShowGrid(true);
  };

  // Method to go back to the TransactionForm
  const handleBackToForm = () => {
    setShowGrid(false);
  };

  return (
    <div>
      <h1>Transaction Management System</h1>
      {!showGrid ? (
        // Render TransactionForm and pass handleViewTransactions as a prop
        <TransactionForm onViewTransactions={handleViewTransactions} />
      ) : (
        // Render TransactionGrid and pass handleBackToForm as a prop
        <TransactionGrid onBack={handleBackToForm} />
      )}
    </div>
  );
};

export default App;