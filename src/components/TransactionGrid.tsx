import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community"; // Import ColDef type
import TransactionService, { Transaction } from "../Service/TransactionService";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface TransactionGridProps {
  onBack: () => void;
}

const TransactionGrid: React.FC<TransactionGridProps> = ({ onBack }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Define column definitions for AG Grid with proper typing
  const defaultcolumnDefs: ColDef<Transaction>[] = [
    { headerName: "Transaction ID", field: "transactionId", sortable: true, filter: true },
    { headerName: "Sender Account", field: "senderAccount", sortable: true, filter: true },
    { headerName: "Receiver Account", field: "receiverAccount", sortable: true, filter: true },
    { headerName: "Amount", field: "amount", sortable: true, filter: true, valueFormatter: (params) => `₹${params.value.toFixed(2)}` },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    {
      headerName: "Category",
      field: "transactionCategory",
      sortable: true,
      filter: true,
      valueGetter: (params) => (params.data ? params.data.transactionCategory || "N/A" : "N/A"), // Null check for params.data
    },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await TransactionService.getAllTransactions();
        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions. Please try again later.");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-grid">
      <h2 className="transaction-heading">Transaction History</h2>
      {error && <p className="error-message">{error}</p>}
      {!error && transactions.length === 0 && <p className="no-transactions">No transactions found.</p>}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={transactions} // Set row data
          columnDefs={defaultcolumnDefs} // Set column definitions
          pagination={true} // Enable pagination
          paginationPageSize={10} // Set page size
        />
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default TransactionGrid;