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
  },
};

export const themeCss = variablesToStyle(theme);
export const tokens = variablesToKeys(theme);
