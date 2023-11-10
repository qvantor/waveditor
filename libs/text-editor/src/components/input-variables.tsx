import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { useVariablesEditor } from '../variables';
import { OneLine } from '../constants';
import { BaseEditor, Props as BaseProps } from './base-editor';

const InputStyle = styled(BaseEditor)`
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
  padding: 0 7px;
  overflow-y: hidden;
  overflow-x: auto;
  height: 22px;

  p {
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    border-color: ${tokens.color.surface.accentHover};
  }

  &.ProseMirror-focused {
    border-color: ${tokens.color.surface.accent};
  }
`;

type Props = Omit<BaseProps, 'extensions' | 'menu'>;
export const InputVariables = ({ ...rest }: Props) => {
  const variablesEditor = useVariablesEditor();
  return (
    <InputStyle
      extensions={[variablesEditor, ...OneLine]}
      autoFocus={false}
      menu={false}
      {...rest}
    />
  );
};
