import { useRef, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { LayoutRender, renderToString } from '@waveditors/layout-editor';
import { Modal } from 'antd';
import { Iframe } from '@waveditors/ui-kit';
import { useMailBuilderContext } from '../common/hooks';

const Root = styled.div`
  height: ${tokens.size.headerHeight};
  background: ${tokens.color.surface.tertiary};
`;
const IframeInternal = styled(Iframe)`
  height: calc(100vh - 250px);
`;
export const Header = () => {
  const doc = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const {
    stores: { elements, relations },
    config,
  } = useMailBuilderContext();
  const send = async () => {
    const data = new FormData();
    data.append(
      'from',
      `Excited User waveditor@${process.env.NX_MAILGUN_DOMAIN_NAME}`
    );
    data.append('to', process.env.NX_TO_EMAIL as string);
    data.append('subject', 'Waveditor email test');
    data.append(
      'html',
      renderToString({
        config: config.bs,
        relations: relations.bs,
        elements: elements.bs,
      })
    );

    // await fetch(
    //   `https://api.mailgun.net/v3/${process.env.NX_MAILGUN_DOMAIN_NAME}/messages`,
    //   {
    //     method: 'POST',
    //     body: data,
    //     headers: {
    //       Authorization: `Basic ${btoa(`api:${process.env.NX_MAILGUN_KEY}`)}`,
    //     },
    //   }
    // );
    // console.log('sent', data.get('html'));
  };
  return (
    <>
      <Root onClick={() => setOpen(!open)} />
      <Modal
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        open={open}
        width={1000}
      >
        <button onClick={send}>send</button>
        <IframeInternal title='Preview'>
          {({ document }) => {
            doc.current = document.body;
            return (
              <LayoutRender
                config={config.bs}
                relations={relations.bs}
                elements={elements.bs}
              />
            );
          }}
        </IframeInternal>
      </Modal>
    </>
  );
};
