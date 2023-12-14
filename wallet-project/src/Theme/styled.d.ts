// src/Theme/styled.d.ts
import 'styled-components';
import { Theme } from '@mui/material/styles';

// Define your custom colors
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    colors: {
      primary: string; // Light Blue
      secondary: string; // Dark Blue
      background: string; // White
    };
  }
}
