import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/transactions';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  // Add other fields as per your API response
}

const TransactionService = {
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
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },
};

export default TransactionService;