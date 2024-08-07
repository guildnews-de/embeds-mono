import { createTheme, type Theme } from '@mui/material';

export const embedTheme: Theme = createTheme({
  typography: {
    fontFamily: [
      'Menomonia',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});
