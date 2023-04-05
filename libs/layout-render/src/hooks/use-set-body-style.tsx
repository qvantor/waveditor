import { useEffect } from 'react';
import { Style } from '@waveditors/editor-model';
import { useRootStyle } from './use-root-style';

export const useSetBodyStyle = (doc = document) => {
  const css = useRootStyle();
  useEffect(() => {
    Object.entries(css).forEach(([key, value]) => {
      doc.body.style[key as keyof Style] = value as string;
    });
    return () => {
      Object.entries(css).forEach(([key]) => {
        doc.body.style[key as keyof Style] = '';
      });
    };
  }, [css, doc]);
};
