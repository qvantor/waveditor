import { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { LayoutRender } from '@waveditors/layout-editor';
import { Modal } from 'antd';
import { useMailBuilderContext } from '../common/hooks';

const Root = styled.div`
  height: ${tokens.size.headerHeight};
  background: ${tokens.color.surface.tertiary};
`;
export const Header = () => {
  const [open, setOpen] = useState(false);
  const {
    stores: { elements, relations },
    config,
  } = useMailBuilderContext();
  return (
    <>
      <Root onClick={() => setOpen(!open)} />
      <Modal
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        open={open}
        width={1000}
      >
        <LayoutRender
          config={config.bs}
          relations={relations.bs}
          elements={elements.bs}
        />
      </Modal>
    </>
  );
};
