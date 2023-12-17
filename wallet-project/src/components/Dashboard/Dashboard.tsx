import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Grid,
    Box,
    Button,
    Stack,
    Typography,
    Snackbar,
    Alert } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getDatabase, ref, onValue, off } from 'firebase/database';

// Internal imports
import { NavBar } from '../sharedComponents';
import dashboardStyles from '../Themes'; // Define and import your dashboard styles
import { MessageType } from '../Auth/Auth';

export const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string>();
    const [messageType, setMessageType] = useState<MessageType>();
    const [accountSummary, setAccountSummary] = useState<any>(); // Define a type for account summary
    const userId = localStorage.getItem('uuid');
    const accountRef = ref(getDatabase(), `accounts/${userId}/`);

    useEffect(() => {
        onValue(accountRef, (snapshot) => {
            const data = snapshot.val();
            setAccountSummary(data);
        });

        return () => {
            off(accountRef);
        };
    }, []);

    return (
        <Box sx={dashboardStyles.container}>
            <NavBar />
            <Typography variant="h4" sx={dashboardStyles.header}>
               BancoDigital Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={dashboardStyles.card}>
                        <CardContent>
                            <Typography variant="h6">Account Summary</Typography>
                            <AccountBalanceWalletIcon sx={dashboardStyles.icon} />
                            <Typography variant="body1">Balance: ${accountSummary?.balance}</Typography>
                            {/* Include other account summary details */}
                        </CardContent>
                    </Card>
                </Grid>
                {/* Include other dashboard items like recent transactions, etc. */}
            </Grid>
            <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;
