import { createGlobalStyle, DefaultTheme } from 'styled-components';

interface Colors {
  background: string;
  primary: string;
  primaryLight: string; // Added for lighter variant
  primaryDark: string;  // Added for darker variant
  hover: string;
  text: string;
  lightText: string;
  shadow: string;
  messageUser: string;
  messageOther: string;
}

interface Typography {
  fontSizeSmall: string;
  fontSizeMedium: string;
  fontSizeLarge: string;
  fontWeightNormal: number;
  fontWeightBold: number;
  lineHeight: number;
}

interface Spacing {
  small: string;
  medium: string;
  large: string;
}

interface CustomTheme extends DefaultTheme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
}

const colors: Colors = {
  background: '#1A1C23', // Darker background
  primary: '#3A3F4B', // Dark primary
  primaryLight: '#505A6B', // Light primary
  primaryDark: '#252932', // Darker primary
  hover: '#6C798F', // Bright hover color
  text: '#E2E2E2', // Bright text color
  lightText: '#FFFFFF', // White text for contrast
  shadow: 'rgba(0, 0, 0, 0.4)', // Deeper shadow
  messageUser: '#58B4F6', // User message color
  messageOther: '#E1E1E1', // Other message color
};

const typography: Typography = {
  fontSizeSmall: '14px',
  fontSizeMedium: '16px',
  fontSizeLarge: '20px',
  fontWeightNormal: 400,
  fontWeightBold: 700,
  lineHeight: 1.5,
};

const spacing: Spacing = {
  small: '8px',
  medium: '16px',
  large: '24px',
};

export const theme: CustomTheme = {
  colors,
  typography,
  spacing,
};

export const GlobalStyle = createGlobalStyle<{ theme?: CustomTheme }>`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${props => props.theme?.colors.background};
    color: ${props => props.theme?.colors.text};
    margin: 0;
    padding: 0;
  }
  // Add more global styles here
`;


export default theme;







