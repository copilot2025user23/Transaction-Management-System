export const mockApi = {
    viewTransactions: async () => {
      return [
        {
          id: "TXN12345",
          receiver: "John Doe",
          accountNumber: "1234567890",
          ifscCode: "HDFC0001234",
          amount: 1000,
          type: "Credit",
          status: "Success",
        },
        {
          id: "TXN12346",
          receiver: "Jane Smith",
          accountNumber: "9876543210",
          ifscCode: "ICIC0005678",
          amount: 2000,
          type: "Debit",
          status: "Pending",
        },
        {
          id: "TXN12347",
          receiver: "Alice Johnson",
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
      return [
        { name: "John Doe", accountNumber: "1234567890", ifscCode: "HDFC0001234" },
        { name: "Jane Smith", accountNumber: "9876543210", ifscCode: "ICIC0005678" },
        { name: "Alice Johnson", accountNumber: "1122334455", ifscCode: "SBI0009876" },
      ];
    },
  };