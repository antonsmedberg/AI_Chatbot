// LandingPageComponent.js
import React from 'react';
import styled from 'styled-components';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #666;
`;

const LandingPageComponent = () => {
  return (
    <LandingContainer>
      <Title>Welcome to AI Chatbot</Title>
      <Description>Interact with our AI-powered chatbot and explore its capabilities.</Description>
      {/* Add more content or visuals as needed */}
    </LandingContainer>
  );
};

export default LandingPageComponent;
