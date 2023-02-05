import { BehaviorSubject } from 'rxjs';

export const hoverStore = () => {
  const hover = new BehaviorSubject<string | null>(null);

  const addHover = (id: string) => hover.next(id);
  const removeHover = () => hover.next(null);
  return { hover, addHover, removeHover };
};

export type HoverStore = ReturnType<typeof hoverStore>;
