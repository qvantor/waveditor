import { CSSProperties, Fragment, useMemo } from 'react';
import { ColumnDumb } from '@waveditors/layout-render';
import { Column as ColumnType, Position } from '@waveditors/editor-model';
import { font, theme } from '@waveditors/theme';
import styled from 'styled-components';
import { BsBoxArrowInDown } from 'react-icons/bs';
import { Element } from './element';

interface Props {
  column: ColumnType;
  width: number;
  dndPreview?: Position;
  index: number;
  style?: CSSProperties;
  padding: string;
}

const DndPreview = styled.div`
  height: 10px;
  border: 1px dashed ${theme.color.border.tertiary};
  margin: 5px;
`;
const EmptyColPreview = styled.div`
  color: ${theme.color.text.quaternary};
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 2px;
  ${font({ type: 'paragraph', size: 'smallest' })}
`;

export const Column = ({
  column,
  width,
  dndPreview,
  index,
  style,
  padding,
}: Props) => {
  const isEmpty = column.children.length === 0;
  const newStyle = useMemo(() => {
    const verticalAlign = column.style?.verticalAlign;
    const baseStyle = { ...style, verticalAlign };

    if (!isEmpty) return baseStyle;
    return {
      outline: `1px dashed ${theme.color.border.primary}`,
      outlineOffset: -2,
      ...baseStyle,
    };
  }, [style, isEmpty, column.style]);
  return (
    <ColumnDumb
      align={column.style?.textAlign}
      index={index}
      width={width}
      style={newStyle}
      padding={padding}
    >
      {column.children.map((id, i) => {
        const dndBefore = dndPreview?.index === 0 && dndPreview?.index === i;
        const dndAfter = dndPreview?.index === i + 1;
        return (
          <Fragment key={id}>
            {dndBefore && <DndPreview />}
            <Element id={id} width={width} />
            {dndAfter && <DndPreview />}
          </Fragment>
        );
      })}
      {isEmpty &&
        (dndPreview ? (
          <DndPreview />
        ) : (
          <EmptyColPreview>
            <BsBoxArrowInDown />
          </EmptyColPreview>
        ))}
    </ColumnDumb>
  );
};
