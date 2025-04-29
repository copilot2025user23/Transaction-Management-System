import React, { useState, useEffect } from "react";
import TransactionService from "../Service/TransactionService";
import { mockApi } from "../mock/api"; // Import mockApi for fetching receivers

const TransactionForm: React.FC = () => {
  const [receivers, setReceivers] = useState<{ senderAccount: string; name: string; receiverAccount: string; ifscCode: string }[]>([]);
  const [receiver, setReceiver] = useState("");
  const [receiverAccount, setReceiverAccount] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [type, setType] = useState("NEFT"); // Default transfer type
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch the list of receivers using mockApi
  useEffect(() => {
    const fetchReceivers = async () => {
      try {
        const receiverList = await mockApi.getReceivers(); // Fetch receivers from mockApi
        setReceivers(receiverList);
      } catch (error) {
        console.error("Error fetching receivers:", error);
        setError("Failed to fetch receivers. Please try again later.");
      }
    };

    fetchReceivers();
  }, []);

  // Handle receiver selection and populate form fields
  const handleReceiverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedReceiver = receivers.find((r) => r.name === e.target.value);
    if (selectedReceiver) {
      setReceiver(selectedReceiver.name);
      setReceiverAccount(selectedReceiver.receiverAccount);
      setIfscCode(selectedReceiver.ifscCode);
    } else {
      setReceiver("");
      setReceiverAccount("");
      setIfscCode("");
    }
  };

  const sendOtp = async () => {
    const mobileNumber = sessionStorage.getItem("mobileNumber"); // Fetch logged-in user's mobile number
    if (!mobileNumber) {
      setError("Mobile number not found. Please log in again.");
      return;
    }

    try {
      // Mock OTP sending
      const otpResponse = await mockApi.sendOtp(mobileNumber);
      if (otpResponse.success) {
        setIsOtpSent(true);
        alert(`OTP sent to ${mobileNumber}`);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again later.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate fields
    if (!receiver || !receiverAccount || !amount || !otp) {
      setError("All fields are required, including OTP.");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    // Prepare payload
    const payload = {
      senderAccount: sessionStorage.getItem("accountId") || "UNKNOWN_ACCOUNT", // Fetch senderAccount from session storage
      receiverAccount: receiverAccount,
      amount,
      status: "PENDING", // Default status
      currency: "INR", // Include transfer type in the payload
    };

    try {
      // Call the initiateTransaction API
      const response = await TransactionService.initiateTransaction(payload);
      if (response.status==='success') {
        setSuccessMessage("Transaction initiated successfully!");
        // Clear the form
        setReceiver("");
        setReceiverAccount("");
        setIfscCode("");
        setAmount("");
        setType("NEFT"); // Reset transfer type to default
        setDescription("");
        setOtp("");
        setIsOtpSent(false);
      } else {
        setError("Failed to initiate transaction. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating transaction:", error);
      setError("Failed to initiate transaction. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Initiate Transaction</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <label>Receiver Name:</label>
        <select value={receiver} onChange={handleReceiverChange}>
          <option value="">Select Receiver</option>
          {receivers.map((r) => (
            <option key={r.name} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Account Number:</label>
        <input
          type="text"
          value={receiverAccount}
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
        <label>Transfer Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="NEFT">NEFT</option>
          <option value="IMPS">IMPS</option>
          <option value="UPI">UPI</option>
        </select>
      </div>
      {isOtpSent && ( // Conditionally render the OTP input field
        <div>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>
      )}
      <div className="button-container">
        <button type="button" onClick={sendOtp} disabled={isOtpSent} style={{ marginRight: "10px" }}>
          {isOtpSent ? "OTP Sent" : "Send OTP"}
        </button>
        <button type="submit" disabled={!otp || !isOtpSent}>
          Initiate Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;