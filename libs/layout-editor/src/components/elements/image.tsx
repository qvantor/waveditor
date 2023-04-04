import { ImageStore } from '@waveditors/editor-model';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { ImageDumb, ImageDumbProps } from '@waveditors/layout-render';

type Props = {
  element: ImageStore;
} & Pick<ImageDumbProps, 'attributes'>;

export const Image = ({ element, attributes }: Props) => {
  const image = useBehaviorSubject(element.bs);
  return <ImageDumb image={image} attributes={attributes} />;
};
