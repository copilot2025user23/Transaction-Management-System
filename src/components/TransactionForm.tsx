import React, { useState, useEffect } from "react";
import { mockApi } from "../mock/api"; // Import mockApi for validations

interface TransactionFormProps {
  onViewTransactions: () => void; // Callback function passed from App.tsx
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onViewTransactions }) => {
  const [receivers, setReceivers] = useState<{ name: string; accountNumber: string; ifscCode: string }[]>([]);
  const [receiverName, setReceiverName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [transactionType, setTransactionType] = useState("UPI");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch receivers list on component mount
  useEffect(() => {
    const fetchReceivers = async () => {
      const receiverList = await mockApi.getReceivers();
      setReceivers(receiverList);
    };

    fetchReceivers();
  }, []);

  // Handle receiver selection
  const handleReceiverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedReceiver = receivers.find((receiver) => receiver.name === e.target.value);
    if (selectedReceiver) {
      setReceiverName(selectedReceiver.name);
      setAccountNumber(selectedReceiver.accountNumber);
      setIfscCode(selectedReceiver.ifscCode);
    } else {
      setReceiverName("");
      setAccountNumber("");
      setIfscCode("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate fields
    if (!receiverName || !accountNumber || !ifscCode || !amount) {
      setError("All fields are required.");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    // Validate Account Number
    const accountNumberRegex = /^[0-9]{9,18}$/;
    if (!accountNumberRegex.test(accountNumber)) {
      setError("Account Number must be numeric and between 9 to 18 digits.");
      return;
    }

    // Validate IFSC Code
    const ifscCodeRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscCodeRegex.test(ifscCode)) {
      setError("Invalid IFSC Code. It must follow the format: AAAA0BBBBBB.");
      return;
    }

    // Check user limit
    const userLimitResponse = await mockApi.checkUserLimit();
    if (amount > userLimitResponse.limit) {
      setError(`Amount exceeds the user limit of ${userLimitResponse.limit}.`);
      return;
    }

    // Simulate initiating a transaction
    const transactionResponse = await mockApi.initiateTransaction({
      receiverName,
      accountNumber,
      ifscCode,
      amount,
      transactionType,
    });

    if (transactionResponse.success) {
      setSuccessMessage(`Transaction initiated successfully! Transaction ID: ${transactionResponse.transactionId}`);
      // Clear the form
      setReceiverName("");
      setAccountNumber("");
      setIfscCode("");
      setAmount("");
      setTransactionType("UPI");
    } else {
      setError("Failed to initiate transaction. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Initiate Transaction</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <label>Receiver Name:</label>
        <select value={receiverName} onChange={handleReceiverChange}>
          <option value="">Select Receiver</option>
          {receivers.map((receiver) => (
            <option key={receiver.name} value={receiver.name}>
              {receiver.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Account Number:</label>
        <input
          type="text"
          value={accountNumber}
          placeholder="Enter account number"
          required
          readOnly // Make it read-only since it's auto-filled
        />
      </div>
      <div>
        <label>IFSC Code:</label>
        <input
          type="text"
          value={ifscCode}
          placeholder="Enter IFSC code"
          required
          readOnly // Make it read-only since it's auto-filled
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          required
        />
      </div>
      <div>
        <label>Transaction Type:</label>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="UPI">UPI</option>
          <option value="NEFT">NEFT</option>
          <option value="RTGS">RTGS</option>
          <option value="IMPS">IMPS</option>
        </select>
      </div>
      <button type="submit">Initiate Transaction</button>
      <button type="button" onClick={onViewTransactions} style={{ marginLeft: "10px" }}>
        View Transactions
      </button>
    </form>
  );
};

export default TransactionForm;