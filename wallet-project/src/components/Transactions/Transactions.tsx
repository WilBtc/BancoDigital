import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';
import { getCurrentUserToken } from './auth';

// Define a type for transaction data
type Transaction = {
    id: string;
    date: string;
    type: string;
    amount: number;
    currency: string;
};

const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Assuming you have a function to get the current user's token
                const accessToken = await getCurrentUserToken(); // Replace with your actual function
                const userId = getCurrentUserId(); // Replace with your actual function

                const response = await fetch(`/api/transactions/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
            <Typography variant="h4" gutterBottom>
                Transaction History
            </Typography>
            <List>
                {transactions.map((transaction) => (
                    <React.Fragment key={transaction.id}>
                        <ListItem>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="body1">{transaction.date}</Typography>
                                <Typography variant="body1">{transaction.type}</Typography>
                                <Typography variant="body1">
                                    {transaction.amount.toFixed(2)} {transaction.currency}
                                </Typography>
                            </Box>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default Transactions;

function getCurrentUserId() {
    throw new Error('Function not implemented.');
}
