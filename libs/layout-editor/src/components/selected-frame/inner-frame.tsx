import styled from 'styled-components';
import { theme } from '@waveditors/theme';
import { useSelectedElement } from '../../hooks';

const Root = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Internal = styled.div`
  width: 100%;
  height: 100%;
  outline-offset: -1px;
  outline: 1px dashed ${theme.color.surface.accent};
`;

export const InnerFrame = () => {
  const element = useSelectedElement();
  return (
    <Root style={{ padding: element?.style.padding }}>
      <Internal />
    </Root>
  );
};
