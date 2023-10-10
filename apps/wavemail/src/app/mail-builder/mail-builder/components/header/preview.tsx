import { AiOutlineEye } from 'react-icons/ai';
import styled from 'styled-components';
import { Tooltip, Button, notification } from 'antd';
import {
  builderContextToSnapshot,
  getConfigViewportWidth,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useCallback, useMemo, useState } from 'react';
import { applyVariables } from '@waveditors/layout-render';
import { useBsSelector } from '@waveditors/rxjs-react';
import { addPx } from '@waveditors/utils';
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
import { PreviewModal } from '../../../common/components';

const {
  ModalRoot,
  ModalPreview,
  NoPaddingModal,
  Content,
  Header,
  Form,
  PADDING,
  FORM_WIDTH,
} = PreviewModal;

const PreviewButton = styled(HeaderButton)`
  margin-left: 15px;
`;

const Modal = ({ onCancel }: { onCancel: () => void }) => {
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
    <NoPaddingModal
      open
      footer={null}
      closeIcon={null}
      width={addPx(previewWidth + FORM_WIDTH)}
      onCancel={onCancel}
    >
      <ModalRoot width={previewWidth}>
        <ModalPreview snapshot={snapshot} title='Preview' />
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
    </NoPaddingModal>
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
      {open && <Modal onCancel={() => setOpen(false)} />}
    </>
  );
};
