import { ImageStore } from '@waveditors/editor-model';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { ImageDumb } from '@waveditors/layout-render';

type Props = {
  element: ImageStore;
};

export const Image = ({ element }: Props) => {
  const image = useBehaviorSubject(element.bs);
  return <ImageDumb element={image} />;
};
