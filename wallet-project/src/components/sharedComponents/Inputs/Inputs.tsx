import * as React from 'react';
import { forwardRef } from 'react';
import { TextField } from '@mui/material';

interface InputState {
    name: string;
    placeholder: string;
}

export const InputText = forwardRef((props: InputState, ref) => {
    return (
        <TextField
            variant='outlined'
            margin='normal'
            inputRef={ref}
            fullWidth
            type='text'
            {...props}
        />
    );
});

export const InputPassword = forwardRef((props: InputState, ref) => {
    return (
        <TextField
            variant='outlined'
            margin='normal'
            inputRef={ref}
            fullWidth
            type='password'
            {...props}
        />
    );
});
