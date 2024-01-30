import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Define the dark theme color scheme
const darkTheme = {
  background: '#17212B',
  text: '#FFFFFF',
  activeLink: '#61dafb',
  hoverLink: '#2B3945',
};

// Styled components for Navbar
const NavbarContainer = styled.nav`
  background-color: ${darkTheme.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Added a 3D shadow */
  z-index: 20;
  border-radius: 10px; /* Rounded corners */
`;

const NavbarLinks = styled.div`
  display: flex;
  gap: 20px; /* Add spacing between links */
`;

const NavbarLink = styled(NavLink)`
  text-decoration: none;
  font-family: 'Nunito', sans-serif;
  font-weight: 300; /* Use a thinner font weight */
  color: ${darkTheme.text};
  font-size: 16px; /* Increased font size */
  transition: color 0.3s;
  padding: 8px 12px; /* Added padding for better alignment */

  &:hover {
    color: ${darkTheme.hoverLink};
  }

  &.active {
    font-weight: bold;
    color: ${darkTheme.activeLink};
  }
`;

const MenuButton = styled.button`
  font-size: 24px;
  background-color: transparent;
  color: ${darkTheme.text};
  border: none;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Component for Navbar
interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();

  return (
    <NavbarContainer>
      <NavbarLinks>
        <NavbarLink to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </NavbarLink>
        <NavbarLink
          to="/chat"
          className={location.pathname === '/chat' ? 'active' : ''}
        >
          Chat
        </NavbarLink>
        <NavbarLink
          to="/dashboard"
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          Dashboard
        </NavbarLink>
        <NavbarLink
          to="/settings"
          className={location.pathname === '/settings' ? 'active' : ''}
        >
          Settings
        </NavbarLink>
      </NavbarLinks>
      <MenuButton onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </MenuButton>
    </NavbarContainer>
  );
};

export default Navbar;


