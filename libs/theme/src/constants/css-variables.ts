import { variablesToKeys, variablesToStyle } from '../services';

export const theme = {
  font: {
    family: `'Montserrat', 'Helvetica Neue', Roboto, sans-serif`,
  },
  size: {
    headerHeight: '36px',
    footerHeight: '28px',
  },
  borderRadius: {
    m: '4px',
    l: '6px',
    xl: '8px',
  },
  color: {
    surface: {
      primary: '#EAF0F0',
      primaryHover: '#d2d8d8',
      secondary: '#fff',
      tertiary: '#121417',
      tertiaryHover: '#2c3138',
      quaternary: '#F9F9F9',
      accent: '#3498db',
      accentHover: '#217dbb',
      accentQuarter: 'rgba(52,152,219, 0.25)',
      danger: '#f9d2ce',
      accentSecondary: '#27ae60',
      accentSecondaryQuarter: 'rgba(39,174,96, 0.25)',
    },
    border: {
      primary: '#E8EBEB',
      secondary: '#E3E6E6',
      tertiary: '#7f8c8d',
    },
    element: {
      primary: '#bdc3c7',
    },
    text: {
      primary: '#121417',
      secondary: '#7f8c8d',
      tertiary: '#ecf0f1',
      quaternary: '#b5bcbd',
      danger: '#e74c3c',
      success: '#27ae60',
      accent: '#3498db',
    },
  },
  breakpoint: {
    s: '1024px',
    m: '1280px',
    l: '1440px',
    xl: '1920px',
  },
  typography: {
    paragraph: {
      smallest: 'font-size: 13px;',
      small: 'font-size: 14px;',
      medium: 'font-size: 16px;',
      large: 'font-size: 18px;',
    },
    header: {
      smallest: 'font-size: 16px;',
      small: 'font-size: 18px;',
      medium: 'font-size: 24px;',
      large: 'font-size: 32px;',
    },
  },
  fontWeight: {
    light: '200',
    medium: '400',
    bold: '600',
  },
};

export const themeCss = variablesToStyle(theme);
export const tokens = variablesToKeys(theme);
