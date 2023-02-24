import { variablesToKeys, variablesToStyle } from '../services';

export const theme = {
  size: {
    headerHeight: '28px',
    footerHeight: '28px',
  },
  borderRadius: {
    m: '4px',
  },
  color: {
    surface: {
      primary: '#EAF0F0',
      secondary: '#fff',
      tertiary: '#121417',
      accent: '#3498db',
      danger: '#e74c3c',
    },
    border: {
      primary: '#E8EBEB',
      secondary: '#bdc3c7',
    },
    text: {
      secondary: '#7f8c8d',
      tertiary: '#fff',
    },
  },
  typography: {
    paragraph: {
      small: 'font-size: 13px;',
      medium: 'font-size: 16px;',
      large: 'font-size: 18px;',
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
