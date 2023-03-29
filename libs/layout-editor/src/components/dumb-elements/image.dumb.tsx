import { HTMLAttributes } from 'react';
import { Image } from '@waveditors/editor-model';
import { useStyle } from '../../hooks';

export interface ImageDumbProps {
  image: Image;
  attributes?: HTMLAttributes<HTMLDivElement>;
}

export const ImageDumb = ({ image, attributes }: ImageDumbProps) => {
  const { padding, ...restStyle } = useStyle(image);
  return (
    <div style={{ padding }} {...attributes}>
      <img
        src={image.params.url}
        style={{
          pointerEvents: 'none',
          ...restStyle,
        }}
        alt='alt here'
      />
    </div>
  );
};
