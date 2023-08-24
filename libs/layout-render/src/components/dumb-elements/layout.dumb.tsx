import { CSSProperties, Fragment, useMemo } from 'react';
import { Column, Layout, SMALLEST_LAYOUT_SIZE } from '@waveditors/editor-model';
import { addPx, getXPadding } from '@waveditors/utils';
import { useStyle } from '../../hooks';
import { useElementContext } from '../../constants';
import { LinkHOC } from '../link-hoc';

export interface LayoutDumbProps {
  element: Layout;
  renderColumn: (props: {
    width: number;
    column: Column;
    index: number;
    padding: string;
  }) => JSX.Element;
  style?: CSSProperties;
}

const calcGapOffset = (gap: number, columnCount: number) => {
  if (columnCount <= 1) return 0;
  return gap * (columnCount - 1);
};

const calcColPadding = (gap: number, index: number, colCount: number) => {
  if (colCount <= 1) return '0';
  const padding = addPx(gap / 2);
  if (index === 0) return `0 ${padding} 0 0`;
  if (index === colCount - 1) return `0 0 0 ${padding}`;
  return `0 ${padding}`;
};

export const LayoutDumb = LinkHOC(
  ({ element, style: externalStyle, renderColumn }: LayoutDumbProps) => {
    const layoutStyle = useStyle(element);
    const { parentWidth: width, attributes } = useElementContext();

    // gap calculations
    const { gap, colCount, gapOffset } = useMemo(() => {
      const colCount = element.params.columns.length;
      const gap = element.params.gap ?? 0;
      const gapOffset = calcGapOffset(gap, colCount) / colCount;
      return { gap, colCount, gapOffset };
    }, [element.params.gap, element.params.columns.length]);

    const { verticalAlign, textAlign, ...restStyle } = useMemo(() => {
      const style = {
        borderSpacing: 0,
        width,
        ...externalStyle,
        ...layoutStyle,
      };
      if (!style.height) style.minHeight = SMALLEST_LAYOUT_SIZE;
      return style;
    }, [externalStyle, layoutStyle, width]);

    const columnsWidth = width - getXPadding(element.style.padding);
    const trAttributes = { align: textAlign };
    return (
      <table style={restStyle} {...attributes}>
        <tbody>
          <tr style={{ verticalAlign }} {...trAttributes}>
            {element.params.columns.map((column, i) => {
              const colWidth = (column.proportion / 100) * columnsWidth;
              const skipGap = gapOffset > colWidth;
              const width = skipGap ? colWidth : colWidth - gapOffset;
              const padding = skipGap ? '0' : calcColPadding(gap, i, colCount);
              return (
                <Fragment key={i}>
                  {renderColumn({
                    width,
                    padding,
                    column,
                    index: i,
                  })}
                </Fragment>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  }
);
