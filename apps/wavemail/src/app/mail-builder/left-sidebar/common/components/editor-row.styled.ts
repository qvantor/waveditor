import styled from 'styled-components';

export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 0;
`;
export const SimpleEditorRow = styled.div<{ half?: true }>`
  display: grid;
  grid-template-columns: ${({ half }) => (half ? '1fr 1fr' : '2fr 3fr')};
  align-items: center;
`;
