import { PropsWithChildren, HTMLAttributes } from 'react';
import { jsonToHtml } from '@waveditors/text-editor';
import { Text, useBuilderContext } from '@waveditors/editor-model';
import { useStyle } from '../../hooks';
import { LinkHOC } from '../link-hoc';

export interface TextDumbProps {
  element: Text;
  attributes?: HTMLAttributes<HTMLDivElement>;
}

export const TextDumb = LinkHOC(
  ({ element, children, attributes }: PropsWithChildren<TextDumbProps>) => {
    const style = useStyle(element);
    const {
      model: { variables },
    } = useBuilderContext();
    return (
      <div
        style={style}
        dangerouslySetInnerHTML={
          !children
            ? {
                __html: jsonToHtml(
                  element.params.content,
                  variables.getValue()
                ),
              }
            : undefined
        }
        {...attributes}
      >
        {children ? children : undefined}
      </div>
    );
  }
);
