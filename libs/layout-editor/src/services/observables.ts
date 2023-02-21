import { Observable } from 'rxjs';
import { LAYOUT_EDITOR_ID } from '../constants';

export const resizeObservable = (element: HTMLElement) =>
  new Observable<{ width: number; height: number; top: number; left: number }>(
    (subscriber) => {
      const resizeObserver = new ResizeObserver(() => {
        const parent = document.getElementById(LAYOUT_EDITOR_ID);
        if (!parent) return null;
        const { top: parentTop, left: parentLeft } =
          parent.getBoundingClientRect();
        const { width, height, top, left } = element.getBoundingClientRect();
        subscriber.next({
          width,
          height,
          top: top - parentTop,
          left: left - parentLeft,
        });
      });
      resizeObserver.observe(element);
      return () => resizeObserver.disconnect();
    }
  );
