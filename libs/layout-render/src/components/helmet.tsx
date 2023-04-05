import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

interface Props {
  children: ReactNode;
  iFrameDocument?: Document;
}

const HELMET_DATATYPE = 'helmet';

export const Helmet = ({ children, iFrameDocument = document }: Props) => {
  useEffect(() => {
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      const element = cloneElement(child, {
        ...child.props,
        datatype: HELMET_DATATYPE,
      });
      iFrameDocument.head.insertAdjacentHTML(
        'beforeend',
        renderToStaticMarkup(element)
      );
    });
    return () => {
      iFrameDocument
        ?.querySelectorAll(`[datatype=${HELMET_DATATYPE}]`)
        .forEach((item) => item.remove());
    };
  }, [children, iFrameDocument]);
  return null;
};
