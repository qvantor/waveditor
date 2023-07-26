import { Image } from '@waveditors/editor-model';
import { useStyle } from '../../hooks';
import { LinkHOC } from '../link-hoc';
import { useElementContext } from '../../constants';

export interface ImageDumbProps {
  element: Image;
}

export const ImageDumb = LinkHOC(({ element }: ImageDumbProps) => {
  const { attributes, parentWidth } = useElementContext();
  const { padding, width, height, ...restStyle } = useStyle(
    element,
    parentWidth
  );
  return (
    <div
      style={{
        padding,
        width,
        height,
      }}
      {...attributes}
    >
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
