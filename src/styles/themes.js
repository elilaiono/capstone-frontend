// themes/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // the existing bright blue
    },
    secondary: {
      main: '#f5f5f5', // a light gray color
      light: '#ffffff', // white
      dark: '#c1c1c1',  // a darker gray color
    },
    error: {
      main: '#f44336', // a bold red for errors
    },
    success: {
      main: '#4caf50', // a rich green for success messages
    },
    text: {
      primary: '#333333', // a soft, dark gray for main body text
      secondary: '#7a869a',
      test: '#696969'
    },
    background: {
      default: '#f5f5f5', // a light gray for the background
      paper: '#ffffff', // an even lighter gray for card backgrounds
      test: '#FAF9F6'
    },

  },
});

export default theme;
