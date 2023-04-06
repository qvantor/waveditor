import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { RenderContext, renderToString } from '@waveditors/layout-render';
import { Modal } from 'antd';
import { useObservable } from '@waveditors/rxjs-react';
import {
  getTemplateConfigName,
  selectorToPipe,
} from '@waveditors/editor-model';
import { useMailBuilderContext } from '../common/hooks';
import { Templates } from '../templates';
import { HeaderButton, Input } from '../common/components';

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
export const Header = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [open, setOpen] = useState(false);
  const {
    stores: { elements, relations },
    config,
  } = useMailBuilderContext();
  const name = useObservable(
    config.bs.pipe(selectorToPipe(getTemplateConfigName)),
    getTemplateConfigName(config.getValue())
  );

  const renderContext = useMemo<RenderContext>(
    () => ({
      config: config.bs,
      relations: relations.bs,
      elements: elements.bs,
    }),
    [config.bs, elements.bs, relations.bs]
  );
  const send = async () => {
    const data = new FormData();
    data.append(
      'from',
      `Excited User waveditor@${process.env.NX_MAILGUN_DOMAIN_NAME}`
    );
    data.append('to', process.env.NX_TO_EMAIL as string);
    data.append('subject', 'Waveditor email test');
    data.append('html', renderToString(renderContext));

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
  };
  useEffect(() => {
    if (!frameRef.current || !frameRef.current.contentDocument || !open) return;
    frameRef.current.contentDocument.open();
    frameRef.current.contentDocument.write(renderToString(renderContext));
    frameRef.current.contentDocument.close();
  }, [renderContext, open]);
  return (
    <>
      <Root>
        <Templates />
        <NameInput
          value={name}
          onChange={(name) => config.actions.setName(name ?? '')}
        />
        <HeaderButton onClick={() => setOpen(true)}>HTML preview</HeaderButton>
      </Root>
      <Modal
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        open={open}
        width={1000}
      >
        <button onClick={send}>send</button>
        <IframeInternal ref={frameRef} title='Preview' />
      </Modal>
    </>
  );
};
