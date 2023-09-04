import { AiOutlineEye } from 'react-icons/ai';
import styled from 'styled-components';
import { Tooltip, Modal, Button, notification } from 'antd';
import {
  builderContextToSnapshot,
  getConfigViewportWidth,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useCallback, useMemo, useState } from 'react';
import { applyVariables, RenderPreview } from '@waveditors/layout-render';
import { useBsSelector } from '@waveditors/rxjs-react';
import { addPx } from '@waveditors/utils';
import { tokens, font } from '@waveditors/theme';
import { Input } from '@waveditors/ui-kit';
import { HeaderButton } from '../../../../common/components';
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
import { authStore, getUserFromToken } from '../../../../auth';

const PreviewButton = styled(HeaderButton)`
  margin-left: 15px;
`;
const PADDING = 40;
const FORM_WIDTH = 340;

const PreviewInternal = styled(RenderPreview)`
  display: block;
  height: 80vh;
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
  height: 80vh;
`;

const Content = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  max-height: 80vh;
  overflow-y: auto;
`;

const Header = styled.div`
  ${font({ weight: 'bold', size: 'medium' })}
  color: ${tokens.color.text.secondary}
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PreviewModal = ({ onCancel }: { onCancel: () => void }) => {
  const templateId = useTemplateId();
  const { toastAll } = useErrorHandler();
  const user = useBsSelector(authStore.bs, getUserFromToken);
  const [sendEmail, { loading }] = useSendEmailLazyQuery({
    onError: handleError([toastAll]),
    onCompleted: () =>
      notification.success({
        message: 'Test email send successfully',
      }),
  });
  const [formData, setFormData] = useState({
    subject: 'Waveditor test email',
    to: user?.email ?? 'your@mail.com',
  });
  const context = useBuilderContext();
  const {
    model: { config },
  } = context;
  const width = useBsSelector(config.bs, getConfigViewportWidth);
  const previewWidth = width + PADDING;
  const [variables, setVariables] = useState(
    context.model.variables
      .getValue()
      .reduce<Record<string, string | undefined>>(
        (sum, item) => ({ [item.label]: item.defaultValue, ...sum }),
        {}
      )
  );
  const snapshot = useMemo(
    () => applyVariables(variables)(builderContextToSnapshot(context)),
    [context, variables]
  );
  const sendEmailInternal = useCallback(async () => {
    await sendEmail({
      variables: {
        data: {
          templateId,
          subject: formData.subject,
          to: [formData.to],
          variables,
        },
      },
    });
  }, [sendEmail, formData, templateId, variables]);
  const onChangeInternal = useCallback(
    (key: 'subject' | 'to') => (value?: string) =>
      setFormData((prev) => ({ ...prev, [key]: value })),
    [setFormData]
  );
  return (
    <ModalInternal
      open
      footer={null}
      closeIcon={null}
      width={addPx(previewWidth + FORM_WIDTH)}
      onCancel={onCancel}
    >
      <ModalRoot width={previewWidth}>
        <PreviewInternal snapshot={snapshot} title='Preview' />
        <Content>
          <Header>Send preview</Header>
          <Form>
            <Input
              label='Subject'
              placeholder='Subject'
              validate={validate(required, minLength(3), maxLength(64))}
              value={formData.subject}
              onChange={onChangeInternal('subject')}
            />
            <Input
              label='Email'
              placeholder='Email'
              validate={validate(required, emailValidation)}
              value={formData.to}
              onChange={onChangeInternal('to')}
            />
          </Form>
          <Form>
            {snapshot.variables.map((variable) => (
              <Input
                key={variable.id}
                label={variable.label}
                value={variables[variable.label] ?? ''}
                validate={validate(...(variable.required ? [required] : []))}
                onChange={(value) =>
                  setVariables((prev) => ({
                    ...prev,
                    [variable.label]: value,
                  }))
                }
              />
            ))}
          </Form>
          <Button type='primary' onClick={sendEmailInternal} loading={loading}>
            Send
          </Button>
        </Content>
      </ModalRoot>
    </ModalInternal>
  );
};
export const Preview = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title='Preview'>
        <PreviewButton size='small' onClick={() => setOpen(true)}>
          <AiOutlineEye />
        </PreviewButton>
      </Tooltip>
      {open && <PreviewModal onCancel={() => setOpen(false)} />}
    </>
  );
};
