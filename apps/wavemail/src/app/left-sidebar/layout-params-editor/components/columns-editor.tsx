import { map } from 'rxjs';
import styled, { css } from 'styled-components';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { LayoutStore } from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { font, tokens } from '@waveditors/theme';

interface Props {
  layout: LayoutStore;
}

const Root = styled.div`
  display: flex;
  height: 72px;
  padding: 5px;
  gap: 5px;
  transition: all 0.1s linear;
`;

const ColumnCommon = styled.div`
  justify-content: center;
  align-items: center;
  color: ${tokens.color.text.tertiary};
  border-radius: ${tokens.borderRadius.m};
  cursor: pointer;
  transition: all 0.1s linear;
`;

const Column = styled(ColumnCommon)<{ disabled: boolean }>`
  flex: 1;
  display: flex;
  border: 1px dashed ${tokens.color.border.secondary};

  &:hover {
    border: 1px solid ${tokens.color.surface.danger};
    background: ${tokens.color.surface.danger};
    ${({ disabled }) =>
      disabled &&
      css`
        background: transparent;
        border: 1px dashed ${tokens.color.border.secondary};
        cursor: default;
      `}
  }
`;

const DeleteIcon = styled(AiOutlineDelete)`
  display: none;

  ${Column}:hover & {
    display: block;
  }
`;

const ColumnText = styled.p`
  color: ${tokens.color.text.secondary};
  ${font({ size: 'large', weight: 'bold' })};

  ${Column}:hover & {
    display: none;
  }
`;

const GhostColumn = styled(ColumnCommon)`
  display: none;
  width: 10%;
  height: 36px;
  align-self: center;
  border: 1px dashed ${tokens.color.surface.accent};

  ${Root}:hover & {
    display: flex;
  }

  &:hover {
    background: ${tokens.color.surface.accent};
  }
`;

export const ColumnsEditor = ({ layout }: Props) => {
  const columns = useObservable(
    layout.bs.pipe(map((value) => value.params.columns)),
    layout.getValue().params.columns,
    [layout]
  );

  const removeDisabled = columns.length <= 1;

  return (
    <Root>
      {columns.map((content, index) => (
        <Column
          key={index}
          disabled={removeDisabled}
          onClick={() => !removeDisabled && layout.actions.removeColumn(index)}
        >
          {!removeDisabled && <DeleteIcon />}
          <ColumnText>{content.length}</ColumnText>
        </Column>
      ))}
      {columns.length < 6 && (
        <GhostColumn onClick={layout.actions.addColumn}>
          <AiOutlinePlus />
        </GhostColumn>
      )}
    </Root>
  );
};
