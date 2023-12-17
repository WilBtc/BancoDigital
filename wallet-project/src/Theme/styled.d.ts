// src/Theme/styled.d.ts
import 'styled-components';
import { Theme } from '@mui/material/styles';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    colors: {
      primary: string;   // Light Blue
      secondary: string; // Dark Blue
      background: string; // White
      text: string;      // Black
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };


    typography: {
      fontSizeSmall: string;
      fontSizeMedium: string;
      fontSizeLarge: string;
    };
  }
}
