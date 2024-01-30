// Layout.tsx
import React, { ReactNode } from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Set the container's height to 100% of the viewport height */
`;

const ContentContainer = styled.div`
  flex-grow: 1; /* Allow content to grow and take up remaining space */
  padding: 20px; /* Add padding to the content area */
  overflow-y: auto; /* Add vertical scroll when content exceeds container height */
`;

interface LayoutProps {
  children: ReactNode;
  toggleSidebar: () => void; // Add the toggleSidebar prop
}

const Layout = ({ children, toggleSidebar }: LayoutProps) => {
  return (
    <AppContainer>
      <Navbar toggleSidebar={toggleSidebar} /> {/* Pass the toggleSidebar prop here */}
      <ContentContainer>{children}</ContentContainer>
    </AppContainer>
  );
};

export default Layout;






