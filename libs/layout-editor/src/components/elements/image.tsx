import { ImageStore } from '@waveditors/editor-model';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { ImageDumb } from './image.dumb';

interface Props {
  element: ImageStore;
}

export const ImageRender = ({ element }: Props) => {
  const image = useBehaviorSubject(element.bs);
  return <ImageDumb image={image} />;
};
