import { AiOutlineEye } from 'react-icons/ai';
import styled from 'styled-components';
import { Tooltip, Modal, Button, notification } from 'antd';
import {
  builderContextToSnapshot,
  getConfigViewportWidth,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useCallback, useMemo, useState } from 'react';
import { RenderPreview } from '@waveditors/layout-render';
import { useBsSelector } from '@waveditors/rxjs-react';
import { addPx } from '@waveditors/utils';
import { tokens, font } from '@waveditors/theme';
import { HeaderButton, Input } from '../../../../common/components';
import {
  emailValidation,
  handleError,
  maxLength,
  minLength,
  required,
  validate,
} from '../../../../common/services';
import { useSendEmailLazyQuery } from '../../graphql/send-email.g';
import { useTemplateId } from '../../../common/hooks';
import { useErrorHandler } from '../../../../common/hooks';

const PreviewButton = styled(HeaderButton)`
  margin-left: 15px;
`;
const PADDING = 40;
const FORM_WIDTH = 340;

const PreviewInternal = styled(RenderPreview)`
  height: 80vh;
  display: block;
`;

const ModalInternal = styled(Modal)`
  .ant-modal-content {
    padding: 0;
  }

  .ant-modal-close-x {
    display: none;
  }
`;
const ModalRoot = styled.div<{ width: number }>`
  display: grid;
  grid-template-columns: ${({ width }) => width}px 1fr;
`;

const Content = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const Header = styled.div`
  ${font({ weight: 'bold', size: 'medium' })}
  color: ${tokens.color.text.secondary}
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Preview = () => {
  const templateId = useTemplateId();
  const { toastAll } = useErrorHandler();
  const [open, setOpen] = useState(false);
  const [sendEmail, { loading }] = useSendEmailLazyQuery({
    onError: handleError([toastAll]),
    onCompleted: () =>
      notification.success({
        message: 'Test email send successfully',
      }),
  });
  const [formData, setFormData] = useState({
    subject: 'Waveditor test email',
    to: 'your@mail.com',
  });
  const context = useBuilderContext();
  const {
    model: { config },
  } = context;
  const width = useBsSelector(config.bs, getConfigViewportWidth);
  const previewWidth = width + PADDING;
  const snapshot = useMemo(
    () => builderContextToSnapshot(context),
    [context, open]
  );
  const sendEmailInternal = useCallback(async () => {
    await sendEmail({
      variables: {
        data: { templateId, subject: formData.subject, to: [formData.to] },
      },
    });
  }, [sendEmail, formData, templateId]);
  const onChangeInternal = useCallback(
    (key: 'subject' | 'to') => (value?: string) =>
      setFormData((prev) => ({ ...prev, [key]: value })),
    [setFormData]
  );
  return (
    <>
      <Tooltip title='Preview'>
        <PreviewButton size='small' onClick={() => setOpen(true)}>
          <AiOutlineEye />
        </PreviewButton>
      </Tooltip>
      <ModalInternal
        open={open}
        footer={null}
        closeIcon={null}
        width={addPx(previewWidth + FORM_WIDTH)}
        onCancel={() => setOpen(false)}
      >
        <ModalRoot width={previewWidth}>
          <PreviewInternal snapshot={snapshot} title='Preview' />
          <Content>
            <Header>Send preview</Header>
            <Form>
              <Input
                placeholder='Subject'
                validate={validate(required, minLength(3), maxLength(64))}
                value={formData.subject}
                onChange={onChangeInternal('subject')}
              />
              <Input
                placeholder='Email'
                validate={validate(required, emailValidation)}
                value={formData.to}
                onChange={onChangeInternal('to')}
              />
            </Form>
            <Button
              type='primary'
              onClick={sendEmailInternal}
              loading={loading}
            >
              Send
            </Button>
          </Content>
        </ModalRoot>
      </ModalInternal>
    </>
  );
};
