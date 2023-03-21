import { ImageStore } from '@waveditors/editor-model';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { ImageDumb } from '../dumb-elements';

interface Props {
  element: ImageStore;
}

export const Image = ({ element }: Props) => {
  const image = useBehaviorSubject(element.bs);
  return <ImageDumb image={image} />;
};
