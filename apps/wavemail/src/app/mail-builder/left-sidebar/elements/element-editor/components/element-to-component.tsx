import { AiOutlineSave } from 'react-icons/ai';
import {
  ConfigStore,
  EditorSnapshot,
  extractComponent,
  useAction,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useCallback, useMemo, useRef, useState } from 'react';
import { addPx } from '@waveditors/utils';
import { Input, Select } from '@waveditors/ui-kit';
import { Button, notification } from 'antd';
import {
  from,
  map,
  switchMap,
  firstValueFrom,
  of,
  forkJoin,
  defaultIfEmpty,
} from 'rxjs';
import { IconButton } from '../../../../../common/components';
import { PreviewModal } from '../../../../common/components';
import {
  maxLength,
  minLength,
  required,
  validate,
} from '../../../../../common/services';
import { useTagsQuery } from '../graphql/tags.g';
import { useCreateComponentMutation } from '../graphql/create-component.g';
import { useCreateTagMutation } from '../graphql/create-tag.g';
import { ComponentsDocument } from '../../../create-item/graphql/components.g';

const {
  ModalRoot,
  ModalPreview,
  NoPaddingModal,
  Content,
  Header,
  Form,
  FORM_WIDTH,
} = PreviewModal;

interface Props {
  elementId: string;
}

const componentToPreview = (
  component: EditorSnapshot,
  config: ConfigStore
): EditorSnapshot => ({
  ...component,
  config: {
    ...component.config,
    fonts:
      component.config.fonts.length === 0
        ? [config.getValue().fonts[0]]
        : component.config.fonts,
    style: {
      margin: '0px',
    },
  },
});

export const ElementToComponent = ({ elementId }: Props) => {
  const {
    model: { config },
  } = useBuilderContext();
  const previewDoc = useRef<Document | null>(null);
  const [createComponent, { loading }] = useCreateComponentMutation();
  const [createTag, { loading: tagCreating }] = useCreateTagMutation();
  const [{ open, component }, setComponent] = useState<
    | {
        open: true;
        component: EditorSnapshot;
      }
    | { open: false; component: EditorSnapshot | null }
  >({ open: false, component: null });
  const [form, setForm] = useState<{ name: string; tags: (string | number)[] }>(
    {
      name: 'Component',
      tags: [],
    }
  );
  const extractComp = useAction(extractComponent);
  const openModal = useCallback(
    () => setComponent({ open: true, component: extractComp(elementId) }),
    [extractComp, elementId]
  );
  const previewWidth = component?.config.viewportWidth ?? 0;
  const closeModal = useCallback(
    () => setComponent((prev) => ({ ...prev, open: false })),
    []
  );
  const { data } = useTagsQuery();
  const tagOptions = useMemo(
    () => (data?.tags ?? []).map((tag) => ({ value: tag.id, label: tag.name })),
    [data]
  );

  const onSubmit = useCallback(async () => {
    if (form.tags.length === 0)
      return notification.error({
        message: 'At least one tag is required',
      });
    if (!previewDoc.current) return console.error('previewDoc is not defined');
    const previewHeight = (previewDoc.current.body.firstChild as HTMLElement)
      .offsetHeight;
    const [tags, newTags] = form.tags.reduce<[number[], string[]]>(
      ([ids, names], tag) =>
        typeof tag === 'string'
          ? [ids, [...names, tag]]
          : [[...ids, tag], names],
      [[], []]
    );
    const newTagsId = await firstValueFrom(
      of(newTags).pipe(
        switchMap((names) =>
          forkJoin(
            names.map((name) => from(createTag({ variables: { name } })))
          )
        ),
        defaultIfEmpty([]),
        map((value) =>
          value
            .map((result) => result.data?.createTag.id)
            .filter((value): value is number => Boolean(value))
        )
      )
    );

    await createComponent({
      variables: {
        data: {
          ...form,
          tags: [...tags, ...newTagsId],
          json: component,
          previewHeight,
        },
      },
      refetchQueries: [ComponentsDocument],
    });
    setComponent((prev) => ({ ...prev, open: false }));
  }, [form, createComponent, component, createTag]);
  return (
    <>
      <IconButton
        size='small'
        type='text'
        icon={<AiOutlineSave />}
        onClick={openModal}
      />
      <NoPaddingModal
        footer={null}
        closeIcon={null}
        open={open}
        width={addPx(previewWidth + FORM_WIDTH)}
        onCancel={closeModal}
      >
        <ModalRoot width={previewWidth + 20}>
          {component && (
            <ModalPreview
              title='Component preview'
              snapshot={componentToPreview(component, config)}
              applyToDocument={(doc) => (previewDoc.current = doc)}
            />
          )}
          <Content>
            <Header>Create component</Header>
            <Form>
              <Input
                label='Name'
                placeholder='Name'
                value={form.name}
                onChange={(name) =>
                  setForm((prev) => ({ ...prev, name: name as string }))
                }
                validate={validate(required, minLength(3), maxLength(24))}
              />
              <Select<number[]>
                options={tagOptions}
                placeholder='Tags'
                label='Tags'
                mode='tags'
                value={form.tags}
                filterOption={(value, option) =>
                  String(option?.label)
                    .toLowerCase()
                    .includes(value.toLowerCase())
                }
                onChange={(tags) => setForm((prev) => ({ ...prev, tags }))}
              />
            </Form>
            <Button
              type='primary'
              onClick={onSubmit}
              disabled={loading || tagCreating}
            >
              Create
            </Button>
          </Content>
        </ModalRoot>
      </NoPaddingModal>
    </>
  );
};
