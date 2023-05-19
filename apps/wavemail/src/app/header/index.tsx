import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { RenderContext, renderToString } from '@waveditors/layout-render';
import { Modal, Button, message } from 'antd';
import { useBsSelector } from '@waveditors/rxjs-react';
import { getTemplateConfigName } from '@waveditors/editor-model';
import { useMailBuilderContext } from '../common/hooks';
import { Templates } from '../templates';
import { HeaderButton, Input } from '../common/components';
import { emailValidation } from '../common/services';

const Root = styled.div`
  height: ${tokens.size.headerHeight};
  background: ${tokens.color.surface.tertiary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
const IframeInternal = styled.iframe`
  height: calc(100vh - 250px);
  width: 100%;
  border: none;
`;
const NameInput = styled(Input)`
  width: 200px;
  background: transparent;
  border: none;
  color: ${tokens.color.text.tertiary};
  text-align: center;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 10px;
`;
export const Header = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState(process.env.NX_TO_EMAIL ?? '');
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [open, setOpen] = useState(false);
  const {
    stores: { elements, relations, variables },
    config,
  } = useMailBuilderContext();
  const name = useBsSelector(config.bs, getTemplateConfigName);

  const renderContext = useMemo<RenderContext>(
    () => ({
      config: config.bs,
      relations: relations.bs,
      elements: elements.bs,
      variables: variables.bs,
    }),
    [config.bs, elements.bs, relations.bs, variables.bs]
  );
  const send = async () => {
    const data = new FormData();
    data.append('from', `waveditor@${process.env.NX_MAILGUN_DOMAIN_NAME}`);
    data.append('to', email);
    data.append('subject', 'Waveditor test email');
    data.append('html', renderToString(renderContext));

    if (!process.env.NX_MAILGUN_KEY || !process.env.NX_MAILGUN_DOMAIN_NAME)
      return messageApi.error(
        'Env variables NX_MAILGUN_KEY and NX_MAILGUN_DOMAIN_NAME are required'
      );

    await fetch(
      `https://api.mailgun.net/v3/${process.env.NX_MAILGUN_DOMAIN_NAME}/messages`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Basic ${btoa(`api:${process.env.NX_MAILGUN_KEY}`)}`,
        },
      }
    );
    messageApi.info('Email sent successfully');
  };
  useEffect(() => {
    if (!frameRef.current || !frameRef.current.contentDocument || !open) return;
    frameRef.current.contentDocument.open();
    frameRef.current.contentDocument.write(renderToString(renderContext));
    frameRef.current.contentDocument.close();
  }, [renderContext, open]);
  return (
    <>
      {contextHolder}
      <Root>
        <Templates />
        <NameInput
          value={name}
          onChange={(name) => config.actions.setName(name ?? '')}
        />
        <HeaderButton onClick={() => setOpen(true)}>HTML preview</HeaderButton>
      </Root>
      <Modal
        onCancel={() => setOpen(false)}
        footer={
          <ModalFooter>
            <Input
              placeholder='Email to send'
              validate={emailValidation}
              value={email}
              onChange={(value = '') => setEmail(value)}
            />
            <Button onClick={send} type='primary' size='small'>
              Send test email
            </Button>
          </ModalFooter>
        }
        title='Email HTML preview'
        open={open}
        width='80vw'
      >
        <IframeInternal ref={frameRef} title='Preview' />
      </Modal>
    </>
  );
};
