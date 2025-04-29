import axios from "axios";

const BASE_URL = "http://localhost:8081/api/transactions";

interface InitiateTransactionRequest {
  senderAccount: string;
  receiverAccount: string;
  status: string;
}

export interface Transaction {
  transactionId: string; // Updated to match the API response
  senderAccount: string; // Updated to match the API response
  receiverAccount: string; // Updated to match the API response
  amount: number;
  status: string;
  transactionCategory: string | null; // Updated to match the API response
}

const TransactionService = {
  /**
   * Fetch all transactions.
   * @returns {Promise<Transaction[]>} - A promise that resolves to the list of transactions.
   */
  getAllTransactions: async (): Promise<Transaction[]> => {
    try {
      const response = await axios.get<Transaction[]>(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  },

  /**
   * Fetch transactions for a specific account ID.
   * @param {string} accountId - The ID of the account to fetch transactions for.
   * @returns {Promise<Transaction[]>} - A promise that resolves to the response data.
   */
  getTransactionsByAccountId: async (accountId: string): Promise<Transaction[]> => {
    try {
      const response = await axios.get<Transaction[]>(`${BASE_URL}/${accountId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  },

  /**
   * Initiate a new transaction.
   * @param {InitiateTransactionRequest} transactionData - The transaction details to send in the request body.
   * @returns {Promise<any>} - A promise that resolves to the response data.
   */
  initiateTransaction: async (transactionData: InitiateTransactionRequest): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/initiate`, transactionData);
      return response.data;
    } catch (error) {
      console.error("Error initiating transaction:", error);
      throw error;
    }
  },
};

export default TransactionService;