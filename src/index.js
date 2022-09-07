import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { StoreProvider } from 'easy-peasy';
import store from './store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
        <App />
    </ThemeProvider>
  </StoreProvider>,
);
