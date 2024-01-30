import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// Interface for props
interface InputAreaProps {
  message: string;
  setMessage: (message: string) => void;
  sendChat: (e: React.FormEvent) => void;
  isSidebarOpen: boolean;
}

interface InputAreaContainerProps {
  isSidebarOpen: boolean;
}

const InputAreaContainer = styled.form<InputAreaContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px; /* Adjusted padding for better spacing */
  background-color: ${({ theme }) => theme.colors.primaryDark}; /* Dark theme background color */
  border-radius: 20px;
  position: relative; /* Use relative positioning */
  bottom: 0;
  margin: 20px auto; /* Center the InputArea horizontally and add margin */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 600px) {
    padding: 12px; /* Adjusted padding for smaller screens */
  }
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px 12px; /* Adjusted padding for better spacing */
  font-size: 16px;
  border: none;
  color: #fff;
  outline: none;
  border-radius: 20px;
  margin-right: 10px;
  background-color: transparent;
  font-weight: 400;
  caret-color: #fff;
`;

const SendButton = styled.button`
  width: 48px;
  height: 48px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primaryDark}; /* Dark theme background color */
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
  }
`;

const SendIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 18px;
`;

const InputArea: React.FC<InputAreaProps> = ({ message, setMessage, sendChat, isSidebarOpen }) => (
  <InputAreaContainer onSubmit={sendChat} isSidebarOpen={isSidebarOpen}>
    <InputField
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Send a message..."
    />
    <SendButton type="submit">
      <SendIcon icon={faPaperPlane} />
    </SendButton>
  </InputAreaContainer>
);

export default InputArea;





