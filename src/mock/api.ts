export const mockApi = {
  viewTransactions: async () => {
    return [
      {
        id: "TXN12345",
        receiver: "Rahul Sharma",
        accountNumber: "1234567890",
        ifscCode: "HDFC0001234",
        amount: 1000,
        type: "Credit",
        status: "Success",
      },
      {
        id: "TXN12346",
        receiver: "Priya Singh",
        accountNumber: "9876543210",
        ifscCode: "ICIC0005678",
        amount: 2000,
        type: "Debit",
        status: "Pending",
      },
      {
        id: "TXN12347",
        receiver: "Amit Verma",
        accountNumber: "1122334455",
        ifscCode: "SBI0009876",
        amount: 1500,
        type: "Credit",
        status: "Failed",
      },
    ];
  },

  checkBalance: async () => {
    return { success: true, balance: 5000 };
  },

  checkUserLimit: async () => {
    return { success: true, limit: 10000 };
  },

  initiateTransaction: async (transaction: any) => {
    return { success: true, transactionId: "TXN12348" };
  },

  // New method to fetch the list of receivers
  getReceivers: async () => {
    // Fetch the logged-in user's account ID from session storage
  const senderAccount = sessionStorage.getItem("accountId") || "UNKNOWN_ACCOUNT";

  // Mocked list of receivers
  return [
    { name: "Rahul Sharma", senderAccount, receiverAccount: "1234567890", ifscCode: "HDFC0001234" },
    { name: "Priya Singh", senderAccount, receiverAccount: "9876543210", ifscCode: "ICIC0005678" },
    { name: "Amit Verma", senderAccount, receiverAccount: "1122334455", ifscCode: "SBI0009876" },
    { name: "Neha Gupta", senderAccount, receiverAccount: "5566778899", ifscCode: "AXIS0004321" },
    { name: "Rohit Mehra", senderAccount, receiverAccount: "6677889900", ifscCode: "PNB0008765" },
    { name: "Anjali Desai", senderAccount, receiverAccount: "7788990011", ifscCode: "BOB0006543" },
  ];
  },

  // Updated method to fetch user details
  getUserDetails: async () => {
    return [
      {
        firstName: "Rahul",
        lastName: "Sharma",
        accountId: "ACC123456",
        mobileNumber: "9876543210",
        password: "rahul@123",
      },
      {
        firstName: "Priya",
        lastName: "Singh",
        accountId: "ACC654321",
        mobileNumber: "8765432109",
        password: "priya@123",
      },
      {
        firstName: "Amit",
        lastName: "Verma",
        accountId: "ACC112233",
        mobileNumber: "9988776655",
        password: "amit@123",
      },
      {
        firstName: "Neha",
        lastName: "Gupta",
        accountId: "ACC445566",
        mobileNumber: "8877665544",
        password: "neha@123",
      },
      {
        firstName: "Rohit",
        lastName: "Mehra",
        accountId: "ACC778899",
        mobileNumber: "7766554433",
        password: "rohit@123",
      },
      {
        firstName: "Khushboo",
        lastName: "Pandey",
        accountId: "ACC998877",
        mobileNumber: "9558373278",
        password: "khushi@123",
      },
    ];
  },
  sendOtp: async (mobileNumber: string) => {
    // Mock implementation for sending OTP
    console.log(`Sending OTP to ${mobileNumber}`);
    return { success: true, otp: "123456" }; // Mock success response with OTP
  },
};