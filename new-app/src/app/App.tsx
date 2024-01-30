// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Layout from './Layout';
import ChatComponent from '../components/ChatComponent';
import LandingPageComponent from '../components/LandingPageComponent';
import DashboardComponent from '../components/DashboardComponent';
import SettingsComponent from '../components/SettingsComponent';
import Sidebar from '../components/Sidebar/Sidebar'; // Import the Sidebar component

import { GlobalStyle, theme } from './theme';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Add state for sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        {/* Wrap Sidebar and Layout in a container */}
        <div style={{ position: 'relative' }}>
          {/* Include the Sidebar */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Layout toggleSidebar={toggleSidebar}>
            <Routes>
              <Route path="/" element={<LandingPageComponent />} />
              <Route path="/chat" element={<ChatComponent />} />
              <Route path="/dashboard" element={<DashboardComponent />} />
              <Route path="/settings" element={<SettingsComponent />} />
              {/* Add more routes as needed */}
            </Routes>
          </Layout>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;




