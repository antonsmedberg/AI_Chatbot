import React from 'react';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';

// Define props interface
interface MessageProps {
  text: string;
  isUser: boolean;
  profileImage?: string;
  timestamp: string;
}

const darkTheme = {
  messageUser: '#333', // Update with your message user color
  messageOther: '#444', // Update with your message other color
  text: '#fff', // Update with your text color
  lightText: '#BFBFBF', // Update with your light text color
};

// Styled components
const MessageContainer = styled.div<{ isUser: boolean }>`
display: flex;
align-items: center;
background: ${(props) =>
  props.isUser ? darkTheme.messageUser : darkTheme.messageOther};
padding: 10px;
margin: 10px;
border-radius: 20px;
max-width: 70%;
align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
color: ${darkTheme.text};
position: relative;
word-break: break-word;
font-family: 'Roboto', sans-serif;
box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Timestamp = styled.div<{ isUser: boolean }>`
  font-size: 12px;
  color: ${(props) =>
    props.isUser ? props.theme.colors.lightText : props.theme.colors.text};
  margin-left: ${(props) => (props.isUser ? 'auto' : '10px')};
`;

const Message: React.FC<MessageProps> = ({
  text,
  isUser,
  profileImage,
  timestamp,
}) => (
  <MessageContainer isUser={isUser}>
    {profileImage && <ProfileImage src={profileImage} alt="Profile" />}
    {text}
    <Timestamp isUser={isUser}>{timestamp}</Timestamp>
  </MessageContainer>
);

export default Message;




