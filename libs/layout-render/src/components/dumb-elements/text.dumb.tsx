import { PropsWithChildren, HTMLAttributes } from 'react';
import { jsonToHtml } from '@waveditors/text-editor';
import { Text } from '@waveditors/editor-model';
import { useStyle } from '../../hooks';
import { LinkHOC } from '../link-hoc';

export interface TextDumbProps {
  element: Text;
  attributes?: HTMLAttributes<HTMLDivElement>;
}

export const TextDumb = LinkHOC(
  ({ element, children, attributes }: PropsWithChildren<TextDumbProps>) => {
    const style = useStyle(element);
    return (
      <div
        style={style}
        dangerouslySetInnerHTML={
          !children ? { __html: jsonToHtml(element.params.content) } : undefined
        }
        {...attributes}
      >
        {children ? children : undefined}
      </div>
    );
  }
);
