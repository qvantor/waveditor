import { BehaviorSubject } from 'rxjs';

export const selectedStore = () => {
  const selected = new BehaviorSubject<string | null>(null);
  const setSelected = (id: string) => selected.next(id);
  const unselect = () => selected.next(null);

  return { selected, setSelected, unselect };
};
