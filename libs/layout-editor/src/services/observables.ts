import { Observable } from 'rxjs';

export const resizeObservable = (element: HTMLElement) =>
  new Observable<DOMRect>((subscriber) => {
    const resizeObserver = new ResizeObserver(() =>
      subscriber.next(element.getBoundingClientRect())
    );
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  });
