import { CSSProperties, Fragment, useMemo } from 'react';
import { Column, Layout, SMALLEST_LAYOUT_SIZE } from '@waveditors/editor-model';
import { getXPadding } from '@waveditors/utils';
import { useStyle } from '../../hooks';
import { useElementContext } from '../../constants';
import { LinkHOC } from '../link-hoc';

export interface LayoutDumbProps {
  element: Layout;
  renderColumn: (props: {
    width: number;
    column: Column;
    index: number;
  }) => JSX.Element;
  style?: CSSProperties;
}

export const LayoutDumb = LinkHOC(
  ({ element, style: externalStyle, renderColumn }: LayoutDumbProps) => {
    const layoutStyle = useStyle(element);
    const { parentWidth: width, attributes } = useElementContext();
    const { height, verticalAlign, ...restStyle } = useMemo(() => {
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
    return (
      <table style={restStyle} {...attributes}>
        <tbody>
          <tr style={{ height, verticalAlign }}>
            {element.params.columns.map((column, i) => {
              return (
                <Fragment key={i}>
                  {renderColumn({
                    width: (column.proportion / 100) * columnsWidth,
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
