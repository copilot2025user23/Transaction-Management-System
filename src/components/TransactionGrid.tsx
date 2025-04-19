import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { mockApi } from "../mock/api"; // Import the mockApi object
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface TransactionGridProps {
  onBack: () => void; // Callback function passed from App.tsx
}

const TransactionGrid: React.FC<TransactionGridProps> = ({ onBack }) => {
  const [rowData, setRowData] = useState<any[]>([]);

  const columnDefs = [
    { headerName: "Transaction ID", field: "id", sortable: true, filter: true },
    { headerName: "Receiver", field: "receiver", sortable: true, filter: true },
    { headerName: "Account Number", field: "accountNumber", sortable: true, filter: true },
    { headerName: "IFSC Code", field: "ifscCode", sortable: true, filter: true },
    { headerName: "Amount", field: "amount", sortable: true, filter: true },
    { headerName: "Type", field: "type", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
  ];

  const mockTransactions = [
    {
      id: "1",
      receiver: "John Doe",
      accountNumber: "123456789",
      ifscCode: "ABCD0123456",
      amount: 1000,
      type: "NEFT",
      status: "Completed",
    },
    {
      id: "2",
      receiver: "Jane Smith",
      accountNumber: "987654321",
      ifscCode: "WXYZ0987654",
      amount: 2000,
      type: "RTGS",
      status: "Pending",
    },
  ];

  useEffect(() => {
    const loadTransactions = async () => {
      const transactions = await mockApi.viewTransactions();
      setRowData(transactions);
    };

    loadTransactions();
  }, []);

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: "10px", display: "none" }}>
        Back
      </button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
        />
      </div>
    </div>
  );
};

export default TransactionGrid;