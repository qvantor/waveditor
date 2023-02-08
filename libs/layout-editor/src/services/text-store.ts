import { TextStore } from '@waveditors/editor-model';

export const setContent = (text: TextStore['bs']) => (content: string) => {
  const { value } = text;
  text.next({
    ...value,
    params: {
      ...value.params,
      content,
    },
  });
};
