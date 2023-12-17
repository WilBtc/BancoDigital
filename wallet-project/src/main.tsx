import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Firebase imports
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';

// Internal imports
import { Home, Dashboard, Transactions, Profile, Auth } from './components';
import './index.css';
import theme from './Theme/theme';
import { firebaseConfig } from './firebaseConfig';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path='/' element={<Home title={'BancoDigital'} />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/auth' element={<Auth title={'BancoDigital'} />} />
            </Routes>
          </Router>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);
