import { createTheme } from '@mui/material/styles'

// Color palette : https://colorhunt.co/palette/b5c0d0ccd3caf5e8ddeed3d9
export const colors = {
  primary: '#B5C0D0',
  secondary: '#CCD3CA',
  background_default: '#F5E8DD',
  background_paper: '#FFF8F3',
  error: '#EED3D9',
  warning: '#FAB95B',
  info: '#AAC4F5',
  success: '#A1BC98',
}

export const letterColors: Array<string> = [
    '#A7AAE1',
    '#F5D3C4',
    '#F2AEBB',
]

export const sketchStyle = {
  border: '2px solid #1a1a1a',
  borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
  boxShadow: '3px 3px 0px #1a1a1a',
}

const theme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: {
      default: colors.background_default,
      paper: colors.background_paper,
    },
    error: { main: colors.error },
    warning: { main: colors.warning },
    info: { main: colors.info },
    success: { main: colors.success },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      disabled: '#AAAAAA',
    },
    divider: '#E0D5CB',
  },
  typography: {
    fontFamily: '"Sour Gummy", sans-serif',
    h1: { fontStyle: 'italic', letterSpacing: '-2px' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: '2px solid black',
          borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
          boxShadow: '3px 3px 0px black',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            boxShadow: '1px 1px 0px black',
            transform: 'translate(2px, 2px)',
          },
        },
      },
    },
  },
})

export default theme
