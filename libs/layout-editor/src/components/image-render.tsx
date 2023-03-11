import React from 'react';
import { ImageStore } from '@waveditors/editor-model';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { useStyle } from '../hooks';

interface Props {
  element: ImageStore;
}

export const ImageRender = ({ element }: Props) => {
  const image = useBehaviorSubject(element.bs);
  const { padding, ...restStyle } = useStyle(image);
  return (
    <div style={{ padding }}>
      <img
        src={image.params.url}
        style={{
          pointerEvents: 'none',
          ...restStyle,
        }}
        alt='cat'
      />
    </div>
  );
};
