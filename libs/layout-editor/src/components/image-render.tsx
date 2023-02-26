import React from 'react';
import { ImageStore, styleMapper } from '@waveditors/editor-model';
import { useBehaviorSubject } from '@waveditors/rxjs-react';

interface Props {
  element: ImageStore;
}

export const ImageRender = ({ element }: Props) => {
  const { params, style } = useBehaviorSubject(element.bs);
  const { padding, ...restStyle } = style;
  return (
    <div style={styleMapper({ padding })}>
      <img
        src={params.url}
        style={{
          pointerEvents: 'none',
          ...styleMapper(restStyle),
        }}
        alt='cat'
      />
    </div>
  );
};
