import { useBehaviorSubject, useObservable } from '@waveditors/rxjs-react';
import { distinctUntilChanged, map } from 'rxjs';
import { LayoutStore } from '@waveditors/editor-model';
import { getYPadding } from '@waveditors/utils';
import { useLayoutEditorContext } from '../../hooks';
import { LayoutDumb } from '../dumb-elements';
import { Column } from './column';

interface Props {
  element: LayoutStore;
  width: number;
}

export const Layout = ({ element, width }: Props) => {
  const { internalState } = useLayoutEditorContext();

  const dndPreview = useObservable(
    internalState.dndPreview.pipe(
      map((val) => {
        if (!val) return undefined;
        const { position } = val;
        if (position.layout !== element.bs.value.id) return undefined;
        return position;
      }),
      distinctUntilChanged()
    ),
    null
  );
  const isDnd = useBehaviorSubject(internalState.isDnd);
  const layout = useBehaviorSubject(element.bs);
  const style = {
    minHeight: isDnd ? getYPadding(layout.style.padding) + 10 : 5,
  };
  const columnStyle = isDnd
    ? {
        outline: '1px dashed red',
        outlineOffset: -1,
      }
    : {};

  return (
    <LayoutDumb
      layout={layout}
      width={width}
      style={style}
      columnStyle={columnStyle}
      renderColumn={({ index, ...rest }) => (
        <Column
          dndPreview={dndPreview?.column === index ? dndPreview : undefined}
          {...rest}
        />
      )}
    />
  );
};
