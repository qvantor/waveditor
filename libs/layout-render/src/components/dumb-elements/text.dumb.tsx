import { PropsWithChildren } from 'react';
import { jsonToHtml } from '@waveditors/text-editor';
import { Text, useBuilderContext } from '@waveditors/editor-model';
import { useStyle } from '../../hooks';
import { LinkHOC } from '../link-hoc';
import { useElementContext } from '../../constants';

export interface TextDumbProps {
  element: Text;
}

export const TextDumb = LinkHOC(
  ({ element, children }: PropsWithChildren<TextDumbProps>) => {
    const { attributes, parentWidth } = useElementContext();
    const style = useStyle(element, parentWidth);
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
