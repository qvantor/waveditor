import { Image } from '@waveditors/editor-model';
import { useStyle } from '../../hooks';

interface Props {
  image: Image;
}

export const ImageDumb = ({ image }: Props) => {
  const { padding, ...restStyle } = useStyle(image);
  return (
    <div style={{ padding }}>
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
