import { CSSProperties, PropsWithChildren } from 'react';
import { Align } from '@waveditors/editor-model';
import { COLUMN_DATATYPE } from '../../constants';

interface Props {
  width: number;
  align?: Align;
  index: number;
  style?: CSSProperties;
}

export const ColumnDumb = ({
  children,
  width,
  align,
  index,
  style,
}: PropsWithChildren<Props>) => (
  <td
    style={{
      ...style,
      padding: 0,
    }}
    align={align}
    datatype={COLUMN_DATATYPE}
    data-column={index}
  >
    <div style={{ width }}>{children}</div>
  </td>
);
