import { Variable } from '@waveditors/editor-model';
import { SuggestionKeyDownProps } from '@tiptap/suggestion';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { font, theme } from '@waveditors/theme';

export type VariablesListProps = {
  variables: Variable[];
  command: (value: Variable) => void;
};
export type VariablesListRef = {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
};
const Root = styled.div`
  background: white;
  padding: 5px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  font-family: ${theme.font.family};
`;

const VariableItem = styled.div<{ selected?: boolean }>`
  padding: 2px 5px;
  border-radius: ${theme.borderRadius.m};
  ${font({ size: 'small' })}
  color: ${theme.color.text.secondary};
  display: flex;
  justify-content: space-between;
  gap: 15px;

  span {
    color: ${theme.color.text.primary};
  }

  &:hover {
    background-color: ${theme.color.surface.primary};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${theme.color.surface.accentQuarter};
    `}
`;
export const VariablesList = forwardRef<VariablesListRef, VariablesListProps>(
  ({ variables, command }, ref) => {
    const [selected, setSelected] = useState(0);
    const selectItem = useCallback(
      (index: number) => {
        const variable = variables[index];
        if (variable) command(variable);
      },
      [command, variables]
    );
    useImperativeHandle(
      ref,
      () => ({
        onKeyDown: ({ event }: SuggestionKeyDownProps) => {
          if (event.key === 'ArrowUp') {
            setSelected((selected + variables.length - 1) % variables.length);
            return true;
          }

          if (event.key === 'ArrowDown') {
            setSelected((selected + 1) % variables.length);
            return true;
          }

          if (event.key === 'Enter') {
            selectItem(selected);
            return true;
          }

          return false;
        },
      }),
      [selectItem, selected, variables.length]
    );
    useEffect(() => setSelected(0), [variables.length]);
    return (
      <Root onClick={(e) => e.stopPropagation()}>
        {variables.map((variable, index) => (
          <VariableItem
            onClick={() => selectItem(index)}
            selected={index === selected}
            key={variable.label}
          >
            <span>{variable.label}</span> {variable.type}
          </VariableItem>
        ))}
        {variables.length === 0 && (
          <VariableItem>variables not found</VariableItem>
        )}
      </Root>
    );
  }
);
