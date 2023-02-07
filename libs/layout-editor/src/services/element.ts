import { mapValue } from '@waveditors/utils';

export const elementIdToDOMRect = (id: string) =>
  mapValue(document.getElementById(id), (element) =>
    element.getBoundingClientRect()
  );
