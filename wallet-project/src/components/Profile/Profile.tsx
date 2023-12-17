import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { Box, TextField, Button, Typography } from '@mui/material';

const Profile = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        if (user) {
            try {
                await updateProfile(user, {
                    displayName: name,
                });
                alert('Profile updated successfully');
            } catch (error) {
                alert(`Error updating profile: ${error.message}`);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', my: 4 }}>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                disabled
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleUpdateProfile}
                sx={{ mt: 2 }}
            >
                Update Profile
            </Button>
        </Box>
    );
};

export default Profile;
