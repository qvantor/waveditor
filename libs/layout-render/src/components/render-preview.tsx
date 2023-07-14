import { EditorSnapshot } from '@waveditors/editor-model';
import { Iframe } from '@waveditors/ui-kit';

import { renderToString } from '../services';

interface Props {
  title: string;
  snapshot: EditorSnapshot;
  className?: string;
  applyToDocument?: (doc: Document) => void;
}

export const RenderPreview = ({
  snapshot,
  className,
  title,
  applyToDocument,
}: Props) => (
  <Iframe title={title} className={className}>
    {({ document }) => {
      document.open();
      document.write(renderToString(snapshot));
      document.close();
      applyToDocument?.(document);
      return <></>;
    }}
  </Iframe>
);
