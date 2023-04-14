import { FC } from 'react';
import { ElementCommon } from '@waveditors/editor-model';

export const LinkHOC =
  <P extends { element: ElementCommon }>(Component: FC<P>) =>
  (props: P) => {
    if (props.element.link && props.element.link.url !== '')
      return (
        <a
          href={props.element.link.url}
          target={props.element.link.newTab ? '_blank' : undefined}
          rel='noreferrer'
          onClick={(e) => e.preventDefault()}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Component {...props} />
        </a>
      );
    return <Component {...props} />;
  };
