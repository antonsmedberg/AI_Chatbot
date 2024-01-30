import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';

const NavbarHeight = '100px';

const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px; /* Adjusted padding for better spacing */
  width: 100%;
  max-height: calc(100vh - ${NavbarHeight} - 80px); /* Reduced max-height for better alignment */
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-family: 'Arial', sans-serif;
  color: #fff;
  position: relative;
  bottom: 0; /* Align it to the bottom */
  margin: 0; /* Remove margin */
`;



interface MessageListProps {
  messages: {
    text: string;
    isUser: boolean;
    profileImage?: string;
    timestamp: string;
  }[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <MessageListContainer ref={messageListRef}>
      {messages.map((msg, index) => (
        <Message
          key={index}
          text={msg.text}
          isUser={msg.isUser}
          profileImage={msg.profileImage}
          timestamp={msg.timestamp}
        />
      ))}
    </MessageListContainer>
  );
};

export default MessageList;

