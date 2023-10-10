import { EditorSnapshot } from '@waveditors/editor-model';
import { Iframe } from '@waveditors/ui-kit';

import { CSSProperties } from 'react';
import { renderToString } from '../services';

interface Props {
  title: string;
  snapshot: EditorSnapshot;
  className?: string;
  applyToDocument?: (doc: Document) => void;
  style?: CSSProperties;
}

export const RenderPreview = ({
  snapshot,
  className,
  title,
  applyToDocument,
  style,
}: Props) => (
  <Iframe title={title} className={className} style={style}>
    {({ document }) => {
      document.open();
      document.write(renderToString(snapshot));
      document.close();
      applyToDocument?.(document);
      return <></>;
    }}
  </Iframe>
);
