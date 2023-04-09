import { ElementType } from '../elements';

export const elementSelector = <T extends ElementType>(type: T) => ({
  bs: { value: { type } },
});
