import { variablesToKeys, variablesToStyle } from '../services';

export const theme = {
  size: {
    headerHeight: '28px',
    footerHeight: '28px',
  },
  borderRadius: {
    m: '6px',
  },
  color: {
    surface: {
      primary: '#EAF0F0',
      secondary: '#fff',
      tertiary: '#121417',
    },
    border: {
      primary: '#E8EBEB',
    },
    text: {
      secondary: '#7f8c8d',
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
