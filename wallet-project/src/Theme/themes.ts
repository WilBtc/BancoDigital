import { createTheme } from '@mui/material/styles';
import { DefaultTheme } from 'styled-components';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#ADD8E6', // Light Blue
    },
    secondary: {
      main: '#00008B', // Dark Blue
    },
    background: {
      default: '#FFFFFF', // White
    },
    text: {
      primary: '#000000', // Black for text/letters
    },
  },
});

const theme: DefaultTheme = {
  ...muiTheme,
  colors: {
    primary: '#ADD8E6', // Light Blue
    secondary: '#00008B', // Dark Blue
    background: '#FFFFFF', // White
    text: '#000000', // Black for text/letters
  }
};

export default theme;
