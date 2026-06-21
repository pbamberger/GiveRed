'use client'
import { createTheme } from '@mui/material/styles'

// Generated from seed #C0392B via @material/material-color-utilities
// Full palette in ../../theme-tokens.json
const tokens = {
  primary:              '#b02d21',
  onPrimary:            '#ffffff',
  primaryContainer:     '#ffdad5',
  onPrimaryContainer:   '#410000',
  secondary:            '#775651',
  onSecondary:          '#ffffff',
  secondaryContainer:   '#ffdad5',
  onSecondaryContainer: '#2c1512',
  tertiary:             '#705c2e',
  onTertiary:           '#ffffff',
  tertiaryContainer:    '#fcdfa6',
  onTertiaryContainer:  '#251a00',
  error:                '#ba1a1a',
  onError:              '#ffffff',
  errorContainer:       '#ffdad6',
  onErrorContainer:     '#410002',
  background:           '#fffbff',
  onBackground:         '#201a19',
  surface:              '#fffbff',
  onSurface:            '#201a19',
  surfaceVariant:       '#f5ddda',
  onSurfaceVariant:     '#534341',
  outline:              '#857370',
  outlineVariant:       '#d8c2be',
  inverseSurface:       '#362f2e',
  inverseOnSurface:     '#fbeeec',
  inversePrimary:       '#ffb4a9',
}

export const theme = createTheme({
  palette: {
    primary:    { main: tokens.primary, contrastText: tokens.onPrimary },
    secondary:  { main: tokens.secondary, contrastText: tokens.onSecondary },
    error:      { main: tokens.error, contrastText: tokens.onError },
    background: { default: tokens.background, paper: tokens.surface },
    text:       { primary: tokens.onBackground, secondary: tokens.onSurfaceVariant },
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
    h1: { fontSize: '3.5rem', fontWeight: 400, lineHeight: 1.12 },
    h2: { fontSize: '2rem',   fontWeight: 400, lineHeight: 1.25 },
    h3: { fontSize: '1.75rem',fontWeight: 400, lineHeight: 1.33 },
    h4: { fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.33 },
    h5: { fontSize: '1.375rem',fontWeight: 500, lineHeight: 1.27 },
    h6: { fontSize: '1rem',   fontWeight: 500, lineHeight: 1.5  },
    body1: { fontSize: '1rem',   fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: '0.875rem',fontWeight: 400, lineHeight: 1.43 },
    caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.33 },
    button: { fontSize: '0.875rem', fontWeight: 500, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.surface,
          color: tokens.onSurface,
          boxShadow: 'none',
          borderBottom: `1px solid ${tokens.outlineVariant}`,
        },
      },
    },
  },
})
