import { PropsWithChildren, HTMLAttributes } from 'react';
import { jsonToHtml } from '@waveditors/text-editor';
import { Text } from '@waveditors/editor-model';
import { useStyle } from '../../hooks';

export interface TextDumbProps {
  text: Text;
  attributes?: HTMLAttributes<HTMLDivElement>;
}

export const TextDumb = ({
  text,
  children,
  attributes,
}: PropsWithChildren<TextDumbProps>) => {
  const style = useStyle(text);
  return (
    <div
      style={style}
      dangerouslySetInnerHTML={
        !children ? { __html: jsonToHtml(text.params.content) } : undefined
      }
      {...attributes}
    >
      {children ? children : undefined}
    </div>
  );
};
