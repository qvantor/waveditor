import { TextStore } from '../types';

export const setContent = (text: TextStore) => (content: string) => {
  const { value } = text;
  text.next({
    ...value,
    params: {
      ...value.params,
      content,
    },
  });
};
