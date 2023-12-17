// api/server.ts
import { getCurrentUserToken, getCurrentUserId } from '.components/Auth'; 
import { TransactionData } from './types';

export const bankApiCalls = {
    getUserInfo: async () => {
        const userId = getCurrentUserId();
        const accessToken = await getCurrentUserToken();

        const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        return await response.json();
    },
    getTransactionHistory: async () => {
        const userId = getCurrentUserId();
        const accessToken = await getCurrentUserToken();

        const response = await fetch(`http://localhost:5000/api/transactions/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch transaction history: ${response.status}`);
        }

        return await response.json();
    },
    createTransaction: async (transactionData: TransactionData) => {
        const userId = getCurrentUserId();
        const accessToken = await getCurrentUserToken();

        const response = await fetch(`http://localhost:5000/api/transaction/create/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(transactionData)
        });

        if (!response.ok) {
            throw new Error(`Failed to create transaction: ${response.status}`);
        }

        return await response.json();
    },
    updateTransaction: async (transactionId: string, transactionData: TransactionData) => {
        const userId = getCurrentUserId();
        const accessToken = await getCurrentUserToken();

        const response = await fetch(`http://localhost:5000/api/transaction/update/${transactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(transactionData)
        });

        if (!response.ok) {
            throw new Error(`Failed to update transaction: ${response.status}`);
        }

        return await response.json();
    },
    deleteTransaction: async (transactionId: string) => {
        const userId = getCurrentUserId();
        const accessToken = await getCurrentUserToken();

        const response = await fetch(`http://localhost:5000/api/transaction/delete/${transactionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete transaction: ${response.status}`);
        }

        return await response.json();
    }
};
