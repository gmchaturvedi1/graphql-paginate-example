import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
 MuiTableCell: {
  root: {
   //This can be referred from Material UI API documentation.
   padding: '2px 8px',
   backgroundColor: '#eaeaea',
  },
 },
 typography: {
  fontSize: 12,
 },
 palette: {
  background: {
   default: '#E5E5E5',
  },
  primary: {
   main: '#556cd6',
  },
  secondary: {
   main: '#19857b',
  },
  error: {
   main: red.A400,
  },
 },
});

export default theme;
