import { Observable } from 'rxjs';
import { ELEMENT_DATATYPE } from '../constants';

export type ElementRect = {
  width: number;
  height: number;
  top: number;
  left: number;
};
export const resizeObservable = (element: HTMLElement, doc = document) =>
  new Observable<ElementRect>((subscriber) => {
    const resizeObserver = new ResizeObserver(() => {
      const { top: parentTop, left: parentLeft } =
        doc.body.getBoundingClientRect();
      const { width, height, top, left } = element.getBoundingClientRect();
      subscriber.next({
        width,
        height,
        top: top - parentTop,
        left: left - parentLeft,
      });
    });
    const parent = element.parentElement?.closest(
      `[datatype=${ELEMENT_DATATYPE}]`
    );

    resizeObserver.observe(element);
    if (parent) resizeObserver.observe(parent);
    if (element.parentElement) resizeObserver.observe(element.parentElement);
    if (element.parentElement?.parentElement)
      resizeObserver.observe(element.parentElement.parentElement);
    return () => resizeObserver.disconnect();
  });
