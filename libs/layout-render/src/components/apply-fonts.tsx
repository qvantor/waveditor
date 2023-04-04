import {
  ReactNode,
  Children,
  isValidElement,
  ReactElement,
  useEffect,
  cloneElement,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useObservable } from '@waveditors/rxjs-react';
import {
  getTemplateConfigFonts,
  selectorToPipe,
} from '@waveditors/editor-model';
import { RenderContext } from '../types';
import { useRenderContext } from '../hooks';
import { RenderContextValue } from '../constants';

const renderWithModel = (model: RenderContext, element: ReactElement) =>
  renderToStaticMarkup(
    <RenderContextValue.Provider value={model}>
      {element}
    </RenderContextValue.Provider>
  );

export const Head = ({ datatype }: { datatype?: string }) => {
  const { config } = useRenderContext();
  const fonts = useObservable(
    config.pipe(selectorToPipe(getTemplateConfigFonts)),
    getTemplateConfigFonts(config.getValue())
  );
  return (
    <>
      {fonts.map((font) => {
        if (!font.name || !font.url) return null;
        return (
          <link
            key={font.id}
            href={font.url}
            rel='stylesheet'
            type='text/css'
            datatype={datatype}
          />
        );
      })}
    </>
  );
};

interface Props {
  children: ReactNode;
  iFrameDocument?: Document;
}

const InternalHelmet = ({ children, iFrameDocument = document }: Props) => {
  const model = useRenderContext();
  useEffect(() => {
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      console.log(child);
      iFrameDocument.head.insertAdjacentHTML(
        'beforeend',
        renderWithModel(
          model,
          cloneElement(child, { ...child.props, datatype: 'helmet' })
        )
      );
    });
    return () => {
      iFrameDocument
        ?.querySelectorAll(`[datatype=helmet]`)
        .forEach((item) => item.remove());
    };
  }, [children, iFrameDocument, model]);
  return null;
};

export const ApplyFonts = ({
  iFrameDocument,
}: Pick<Props, 'iFrameDocument'>) => {
  return (
    <InternalHelmet iFrameDocument={iFrameDocument}>
      <Head />
    </InternalHelmet>
  );
};
