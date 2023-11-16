import { FC } from 'react';
import { ElementCommon } from '@waveditors/editor-model';
import { useTipTapToString } from '@waveditors/text-editor';

export const LinkHOC = <P extends { element: ElementCommon }>(
  Component: FC<P>
) =>
  function Element(props: P) {
    const toString = useTipTapToString();
    if (props.element.link) {
      return (
        <a
          href={toString(props.element.link.url)}
          target={props.element.link.newTab ? '_blank' : ''}
          rel='noreferrer'
          onClick={(e) => e.preventDefault()}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Component {...props} />
        </a>
      );
    }
    return <Component {...props} />;
  };
