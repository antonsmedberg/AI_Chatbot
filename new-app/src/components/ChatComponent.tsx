import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import MessageList from './MessageList';
import InputArea from './InputArea';
import robotIcon from '../assets/robot-icon.avif';

// Define the type for chat messages
interface ChatMessage {
  text: string;
  isUser: boolean;
  profileImage?: string;
  timestamp: string;
}

const socket = io('http://localhost:5000');
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



const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isSidebarOpen] = useState<boolean>(true); // Managing the sidebar state




  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat', { text: message, isUser: true });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('chat', (msg: ChatMessage) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    const fakeConversation = [
      {
        text: 'Hello!',
        isUser: false,
        profileImage: robotIcon,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];

    setChat(fakeConversation);

    return () => {
      socket.off('chat');
    };
  }, []);

  return (
    <ChatContainer>
      <MainContent isSidebarOpen={isSidebarOpen}>
        <MessageList messages={chat} />
        <InputArea
          message={message}
          setMessage={setMessage}
          sendChat={sendChat}
          isSidebarOpen={isSidebarOpen} // Passing the prop to InputArea
        />
      </MainContent>
    </ChatContainer>
  );
};

export default ChatComponent;