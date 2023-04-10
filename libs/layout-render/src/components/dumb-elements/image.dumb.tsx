import { HTMLAttributes } from 'react';
import { Image } from '@waveditors/editor-model';
import { useStyle } from '../../hooks';
import { LinkHOC } from '../link-hoc';

export interface ImageDumbProps {
  element: Image;
  attributes?: HTMLAttributes<HTMLDivElement>;
}

export const ImageDumb = LinkHOC(({ element, attributes }: ImageDumbProps) => {
  const { padding, ...restStyle } = useStyle(element);
  return (
    <div style={{ padding }} {...attributes}>
      <img
        src={element.params.url}
        style={{
          pointerEvents: 'none',
          ...restStyle,
        }}
        alt='alt here'
      />
    </div>
  );
});
