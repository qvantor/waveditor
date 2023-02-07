import { TextEditor } from '@waveditors/text-editor';
import { TextStore } from '../types';

export const TextRender = ({ element }: { element: TextStore }) => {
  const text = element.getValue();
  return <TextEditor onChange={console.log} content={text.params.content} />;
};
