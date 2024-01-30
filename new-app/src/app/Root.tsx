// Root.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './theme'; // Import 'theme' and 'GlobalStyle' as named exports
import App from './App';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  );
};

export default Root;














