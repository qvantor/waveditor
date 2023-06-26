import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { Button, message, Modal } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  builderContextToSnapshot,
  useBuilderContext,
} from '@waveditors/editor-model';
import { renderToString } from '@waveditors/layout-render';
import { useTemplateQuery } from '../graphql/template.g';
import { useUpdateTemplateMutation } from '../graphql/update-template.g';
import { useTemplateId } from '../hooks';
import {
  Header as CommonHeader,
  HeaderButton,
  Input,
} from '../../../common/components';
import { emailValidation } from '../../../common/services';

const IframeInternal = styled.iframe`
  height: calc(100vh - 250px);
  width: 100%;
  border: none;
`;
const NameInput = styled(Input)`
  width: 250px;
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
  const templateId = useTemplateId();
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState(process.env.NX_TO_EMAIL ?? '');
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [open, setOpen] = useState(false);
  const builderContext = useBuilderContext();
  const { data } = useTemplateQuery({
    variables: { templateId },
  });
  const [updateTemplate] = useUpdateTemplateMutation();
  const onNameChange = useCallback(
    (name: string | undefined) => {
      if (name) updateTemplate({ variables: { templateId, data: { name } } });
    },
    [updateTemplate, templateId]
  );

  const send = async () => {
    const data = new FormData();
    data.append('from', `waveditor@${process.env.NX_MAILGUN_DOMAIN_NAME}`);
    data.append('to', email);
    data.append('subject', 'Waveditor test email');
    data.append(
      'html',
      renderToString(builderContextToSnapshot(builderContext))
    );

    if (!process.env.NX_MAILGUN_KEY || !process.env.NX_MAILGUN_DOMAIN_NAME)
      return messageApi.error(
        'Env variables NX_MAILGUN_KEY and NX_MAILGUN_DOMAIN_NAME are required, ' +
          'to add them clone repo locally'
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
    frameRef.current.contentDocument.write(
      renderToString(builderContextToSnapshot(builderContext))
    );
    frameRef.current.contentDocument.close();
  }, [open, builderContext]);
  return (
    <>
      {contextHolder}
      <CommonHeader>
        <NameInput value={data?.template.name} onChange={onNameChange} />
        <HeaderButton onClick={() => setOpen(true)}>HTML preview</HeaderButton>
      </CommonHeader>
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
