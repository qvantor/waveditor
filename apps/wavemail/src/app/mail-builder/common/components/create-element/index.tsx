import { useCallback, MouseEvent } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { ElementType } from '@waveditors/editor-model';
import { tokens } from '@waveditors/theme';
import { TfiImage, TfiText } from 'react-icons/tfi';

const Root = styled.div`
  padding: 5px 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Layout = styled.div`
  display: flex;
  height: 54px;
  border: 1px dashed ${tokens.color.surface.tertiary};
  border-radius: ${tokens.borderRadius.m};
  padding: 5px;
  gap: 5px;
  opacity: 0.5;
  transition: all 0.1s linear;

  > div {
    flex: 1;
    border: 1px dashed ${tokens.color.surface.accent};
    border-radius: ${tokens.borderRadius.m};
  }

  &:hover {
    opacity: 0.7;
  }
`;

const ElementsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Element = styled.div`
  flex: 1;
  text-align: center;
  border: 1px solid ${tokens.color.border.secondary};
  border-radius: ${tokens.borderRadius.m};
  padding: 15px;
  font-size: 32px;
  line-height: 24px;
`;

interface Props {
  onMouseDown?: (type: ElementType, e: MouseEvent) => void;
  onClick?: (type: ElementType, e: MouseEvent) => void;
}

export const CreateElement = ({ onMouseDown, onClick }: Props) => {
  const onMouseDownInternal = useCallback(
    (type: ElementType) => (e: MouseEvent) => onMouseDown?.(type, e),
    [onMouseDown]
  );
  const onClickInternal = useCallback(
    (type: ElementType) => (e: MouseEvent) => onClick?.(type, e),
    [onClick]
  );
  return (
    <Root>
      <Tooltip title='Add layout' placement='right'>
        <Layout
          onMouseDown={onMouseDownInternal('layout')}
          onClick={onClickInternal('layout')}
        >
          <div />
          <div />
        </Layout>
      </Tooltip>
      <ElementsContainer>
        <Tooltip title='Add text' placement='bottom'>
          <Element
            onMouseDown={onMouseDownInternal('text')}
            onClick={onClickInternal('text')}
          >
            <TfiText />
          </Element>
        </Tooltip>
        <Tooltip title='Add image' placement='bottom'>
          <Element
            onMouseDown={onMouseDownInternal('image')}
            onClick={onClickInternal('image')}
          >
            <TfiImage />
          </Element>
        </Tooltip>
      </ElementsContainer>
    </Root>
  );
};
