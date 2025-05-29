import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  /* Utility Classes */
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
    cursor: pointer;
    font-weight: 500;
    border: none;
    outline: none;
  }

  .btn-primary {
    background-color: ${theme.colors.primary};
    color: white;
  }

  .btn-primary:hover {
    background-color: ${theme.colors.secondary};
  }

  .btn-outline {
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
  }

  .btn-outline:hover {
    background-color: ${theme.colors.primary};
    color: white;
  }

  .card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: ${theme.shadows.medium};
    padding: 1.25rem;
  }

  /* For mobile responsiveness */
  @media (max-width: ${theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;
