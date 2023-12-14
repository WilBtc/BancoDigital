// src/Theme/themes.ts
import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#1E1F3A', // Dark Blue
    },
    secondary: {
      main: '#FFFFFF', // White
      light: '#4E5A6E', // Light Blue
    },
    info: {
      main: '#007BFF', // Accent color
    },
    background: {
      default: '#FFFFFF', // White background
    },
  },
});
