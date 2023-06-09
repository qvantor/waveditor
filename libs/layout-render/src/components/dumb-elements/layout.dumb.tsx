import { CSSProperties, TableHTMLAttributes } from 'react';
import { Layout } from '@waveditors/editor-model';
import { getXPadding } from '@waveditors/utils';
import { useStyle } from '../../hooks';
import { COLUMN_DATATYPE } from '../../constants';
import { LinkHOC } from '../link-hoc';

export interface LayoutDumbProps {
  element: Layout;
  width: number;
  renderColumn: (props: {
    width: number;
    column: string[];
    index: number;
  }) => JSX.Element;
  style?: CSSProperties;
  columnStyle?: CSSProperties;
  attributes?: TableHTMLAttributes<HTMLTableElement>;
}

export const LayoutDumb = LinkHOC(
  ({
    element,
    width,
    style: externalStyle,
    columnStyle,
    renderColumn,
    attributes,
  }: LayoutDumbProps) => {
    const style = useStyle(element);
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
