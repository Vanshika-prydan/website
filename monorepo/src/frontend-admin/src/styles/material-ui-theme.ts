
import { createMuiTheme } from '@material-ui/core/styles';
import { Shadows } from '@material-ui/core/styles/shadows';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#FCFBFA'
    },
    primary: {
      main: '#258B63',
    },
    secondary: {
      main: '#676767',
    },
  },
  shadows: Array(25).fill('none') as Shadows,
  typography: {
    fontFamily: '"Baloo Chettan 2", "sans-serif"',
  },

});

export default theme;
