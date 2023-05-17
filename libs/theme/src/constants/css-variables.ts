import { variablesToKeys, variablesToStyle } from '../services';

export const theme = {
  font: {
    family: `'Montserrat', 'Helvetica Neue', Roboto, sans-serif`,
  },
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
      primaryHover: '#d2d8d8',
      secondary: '#fff',
      tertiary: '#121417',
      quaternary: '#F9F9F9',
      accent: '#3498db',
      accentQuarter: 'rgba(52,152,219, 0.25)',
      danger: '#e74c3c',
      accentSecondary: '#27ae60',
      accentSecondaryHalf: 'rgba(39,174,96, 0.5)',
    },
    border: {
      primary: '#E8EBEB',
      secondary: '#E3E6E6',
    },
    text: {
      primary: '#121417',
      secondary: '#7f8c8d',
      tertiary: '#fff',
    },
  },
  typography: {
    paragraph: {
      smallest: 'font-size: 12px;',
      small: 'font-size: 14px;',
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
