import { useEffect } from 'react';

interface BodyStyle {
  fontFamily?: string;
  margin?: string;
}

export const useSetBodyStyle = (css: BodyStyle, doc = document) => {
  useEffect(() => {
    Object.entries(css).forEach(([key, value]) => {
      doc.body.style[key as keyof BodyStyle] = value;
    });
    return () => {
      Object.entries(css).forEach(([key]) => {
        doc.body.style[key as keyof BodyStyle] = '';
      });
    };
  }, [css]);
};
