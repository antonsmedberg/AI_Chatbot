import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';

// Improved color scheme
const theme = {
  background: '#17212B', // Darker blue background
  text: '#FFFFFF', // White text color
  buttonBackground: '#2B3945', // Darker blue button background
  boxShadowColor: 'rgba(0, 0, 0, 0.2)', // Light box shadow color
};

const SidebarWidthOpen = '250px';
const NavbarHeight = '60px';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
position: fixed;
top: ${NavbarHeight};
left: ${({ isOpen }) => (isOpen ? '0' : `-${SidebarWidthOpen}`)};
width: ${SidebarWidthOpen};
height: 100vh;
transition: left 0.3s ease;
box-shadow: 0px 0px 15px ${theme.boxShadowColor};
border-radius: 15px; /* Add rounded corners */
background: ${theme.background};
color: ${theme.text};
z-index: 10;
display: flex; /* Use flexbox for layout */
flex-direction: column;
overflow-x: hidden;
`;

const rotateOpen = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(90deg); }
`;

const rotateClose = keyframes`
  from { transform: rotate(90deg); }
  to { transform: rotate(0deg); }
`;

const MenuButton = styled.button<{ isOpen: boolean }>`
  font-size: 24px;
  background-color: transparent;
  color: ${theme.text};
  border: none;
  position: fixed;
  top: ${NavbarHeight};
  left: ${({ isOpen }) => (isOpen ? 'calc(' + SidebarWidthOpen + ' - 40px)' : '15px')};
  transition: left 0.3s ease;
  cursor: pointer;
  z-index: 30;
  animation: ${({ isOpen }) => (isOpen ? rotateOpen : rotateClose)} 0.3s ease forwards;
`;

const SearchFieldContainer = styled.div`
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${theme.buttonBackground};
  border-radius: 4px;
  background-color: transparent;
  display: flex; /* Added flex container for search input */
  align-items: center; /* Center vertically */
`;

const SearchIcon = styled.div`
  padding: 0 10px; /* Add padding for icon spacing */
  color: ${theme.text};
`;

const SearchInput = styled.input`
  flex: 1; /* Take remaining space */
  border: none;
  background-color: transparent;
  color: ${theme.text};
  font-size: 16px;
  outline: none; /* Remove outline on focus */

  &::placeholder {
    color: ${theme.text};
  }
`;


const Header = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  font-weight: bold;
  background-color: transparent;
  color: ${theme.text};
  height: 50px; /* Match NavbarHeight and center vertically */
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: left; 
`;

const Footer = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  color: ${theme.text};
  height: 50px; /* Match NavbarHeight and center vertically */
  display: flex;
  align-items: center; 
  justify-content: left; 
`;

const SidebarSection = styled.div`
  padding: 10px 20px;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  border-bottom: 1px solid ${theme.buttonBackground};
  cursor: pointer; /* Add cursor pointer for better UX */

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${theme.buttonBackground};
    border-radius: 5px;
  }
`;

const SidebarContent = styled.div`
  font-family: 'Nunito', sans-serif;
  background: ${theme.background};
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 2rem 1rem;
`;

// Updated props definition for Sidebar component
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <MenuButton isOpen={isOpen} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </MenuButton>
      <SidebarContainer isOpen={isOpen}>
        <SidebarContent>
          <Header>Chat App</Header>
          <SearchFieldContainer>
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
            <SearchInput placeholder="Search..." />
          </SearchFieldContainer>
          <SidebarSection>Menu Item 1</SidebarSection>
          <SidebarSection>Menu Item 2</SidebarSection>
          <Footer>© 2023 Chat App</Footer>
        </SidebarContent>
      </SidebarContainer>
    </div>
  );
};

export default Sidebar;


