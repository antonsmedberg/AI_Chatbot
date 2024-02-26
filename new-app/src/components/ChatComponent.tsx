import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import MessageList from './MessageList';
import InputArea from './InputArea';
import robotIcon from '../assets/robot-icon.avif';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
const socket = io(SOCKET_URL);
const NavbarHeight = '10px';





const ChatContainer = styled.div`
// Enhanced ChatContainer styles
background-color: ${({ theme }) => theme.colors.background};
color: ${({ theme }) => theme.colors.text};
  display: flex;
  overflow: hidden;
  min-height: 100vh;
  position: relative;
  transition: padding-top 0.3s ease;
`;

interface MainContentProps {
  isSidebarOpen: boolean;
}

const MainContent = styled.div<MainContentProps>`
// Enhanced MainContent styles
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  padding: 40px 20px;
  overflow-y: auto;
  margin-top: ${NavbarHeight}; /* Move the entire content up to align with the navbar */
  transition: margin-left 0.3s ease;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '250px' : '70px')};
  width: calc(100% - ${({ isSidebarOpen }) => (isSidebarOpen ? '250px' : '70px')});
  height: calc(100vh - ${NavbarHeight});
  box-sizing: border-box;
  position: relative;
`;

// Define the type for chat messages
interface ChatMessage {
  text: string;
  isUser: boolean;
  profileImage?: string;
  timestamp: string;
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isSidebarOpen] = useState<boolean>(true); // Managing the sidebar state

  useEffect(() => {
    // Listening for incoming messages
    const handleNewMessage = (msg: ChatMessage) => {
      setChat((prevChat) => [...prevChat, { ...msg, timestamp: new Date().toLocaleTimeString() }]);
    };
    socket.on('chat', handleNewMessage);

    // Example conversation starter
    setChat([{
      text: 'Hello! How can I help you today?',
      isUser: false,
      profileImage: robotIcon,
      timestamp: new Date().toLocaleTimeString(),
    }]);

    return () => {
      socket.off('chat', handleNewMessage);
    };
  }, []);

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Emitting a chat message
      const newMessage: ChatMessage = {
        text: message,
        isUser: true,
        timestamp: new Date().toLocaleTimeString()
      };
      socket.emit('chat', newMessage);
      setChat((prevChat) => [...prevChat, newMessage]);
      setMessage('');
    }
  };

  return (
    <ChatContainer>
      <MainContent isSidebarOpen={isSidebarOpen}>
        <MessageList messages={chat} />
        <InputArea
          message={message}
          setMessage={setMessage}
          sendChat={sendChat}
          isSidebarOpen={isSidebarOpen} // Added missing prop
        />
      </MainContent>
    </ChatContainer>
  );
};



export default ChatComponent;