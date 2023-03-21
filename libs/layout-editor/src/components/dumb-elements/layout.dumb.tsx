import { CSSProperties } from 'react';
import { Layout } from '@waveditors/editor-model';
import { getXPadding } from '@waveditors/utils';
import { useStyle } from '../../hooks';
import { COLUMN_DATATYPE } from '../../constants';

interface Props {
  layout: Layout;
  width: number;
  renderColumn: (props: {
    width: number;
    column: string[];
    index: number;
  }) => JSX.Element;
  style?: CSSProperties;
  columnStyle?: CSSProperties;
}

export const LayoutDumb = ({
  layout,
  width,
  style: externalStyle,
  columnStyle,
  renderColumn,
}: Props) => {
  const style = useStyle(layout);
  const columnWidth =
    (width - getXPadding(layout.style.padding)) / layout.params.columns.length;
  return (
    <table
      style={{
        borderSpacing: 0,
        ...externalStyle,
        ...style,
      }}
    >
      <tbody>
        <tr>
          {layout.params.columns.map((column, i) => {
            return (
              <td
                style={{
                  ...columnStyle,
                  padding: 0,
                }}
                datatype={COLUMN_DATATYPE}
                data-column={i}
                key={i}
              >
                {renderColumn({ width: columnWidth, column, index: i })}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};
