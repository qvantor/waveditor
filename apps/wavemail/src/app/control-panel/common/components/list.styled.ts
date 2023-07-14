import styled from 'styled-components';
import { font, theme, tokens } from '@waveditors/theme';
import { IconButton } from '../../../common/components';

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
  gap: 20px;
  @media only screen and (min-width: ${theme.breakpoint.s}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: ${theme.breakpoint.l}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (min-width: ${theme.breakpoint.xl}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const ListItem = styled.div`
  position: relative;
  border-radius: ${tokens.borderRadius.xl};
  overflow: hidden;
  cursor: pointer;
  background: ${tokens.color.surface.secondary};
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const ListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  ${font({ type: 'paragraph', size: 'small' })}
`;
export const ListItemHeader = styled.div`
  padding: 10px 15px 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 39px;
`;
export const ListItemName = styled.div`
  ${font({ type: 'paragraph', size: 'medium', weight: 'bold' })}
  padding: 15px;
`;

export const ListItemActionButton = styled(IconButton)`
  svg {
    fill: ${tokens.color.text.primary};
  }
`;

export const ListItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${tokens.color.border.primary};
  padding: 15px;

  span {
    ${font({ type: 'paragraph', size: 'smallest' })}
    color: ${tokens.color.text.secondary}
  }
`;
