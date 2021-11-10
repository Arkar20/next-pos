import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#004643",
    },
    secondary: {
      main: "#fffffe",
    },
    error: {
      main: red.A400,
    },
  },
  typography:{
    h5:{
      fontWeight:"bold"
    }
  }
});

export default theme;
