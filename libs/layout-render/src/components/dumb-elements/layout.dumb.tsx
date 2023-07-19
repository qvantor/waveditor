import { CSSProperties } from 'react';
import { Layout } from '@waveditors/editor-model';
import { getXPadding } from '@waveditors/utils';
import { useStyle } from '../../hooks';
import { COLUMN_DATATYPE, useElementContext } from '../../constants';
import { LinkHOC } from '../link-hoc';

export interface LayoutDumbProps {
  element: Layout;
  renderColumn: (props: {
    width: number;
    column: string[];
    index: number;
  }) => JSX.Element;
  style?: CSSProperties;
  columnStyle?: CSSProperties;
}

export const LayoutDumb = LinkHOC(
  ({
    element,
    style: externalStyle,
    columnStyle,
    renderColumn,
  }: LayoutDumbProps) => {
    const style = useStyle(element);
    const { parentWidth: width, attributes } = useElementContext();
    const actualWidth = width - getXPadding(element.style.padding);
    return (
      <table
        style={{
          borderSpacing: 0,
          width,
          ...externalStyle,
          ...style,
        }}
        {...attributes}
      >
        <tbody>
          <tr>
            {element.params.columns.map((column, i) => {
              return (
                <td
                  style={{
                    ...columnStyle,
                    padding: 0,
                  }}
                  align={column.align}
                  datatype={COLUMN_DATATYPE}
                  data-column={i}
                  key={i}
                >
                  {renderColumn({
                    width: (column.proportion / 100) * actualWidth,
                    column: column.children,
                    index: i,
                  })}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  }
);
