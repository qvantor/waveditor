import styled from 'styled-components';
import { RenderPreview } from '@waveditors/layout-render';
import { Modal as AntdModal } from 'antd';
import { font, tokens } from '@waveditors/theme';

export const PADDING = 40;
export const FORM_WIDTH = 340;

export const NoPaddingModal = styled(AntdModal)`
  .ant-modal-content {
    padding: 0;
  }

  .ant-modal-close-x {
    display: none;
  }
`;

export const ModalRoot = styled.div<{ width: number }>`
  display: grid;
  grid-template-columns: ${({ width }) => width}px 1fr;
  height: 80vh;
`;

export const ModalPreview = styled(RenderPreview)`
  display: block;
  height: 80vh;
`;

export const Content = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const Header = styled.div`
  ${font({ weight: 'bold', size: 'medium' })}
  color: ${tokens.color.text.secondary}
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
