import { useBehaviorSubject, useObservable } from '@waveditors/rxjs-react';
import { distinctUntilChanged, map } from 'rxjs';
import { LayoutStore } from '@waveditors/editor-model';
import { getYPadding } from '@waveditors/utils';
import { LayoutDumb } from '@waveditors/layout-render';
import { theme } from '@waveditors/theme';
import { useLayoutEditorContext } from '../../hooks';
import { Column } from './column';

type Props = {
  element: LayoutStore;
};

export const Layout = ({ element }: Props) => {
  const { internalState } = useLayoutEditorContext();

  const dndPreview = useObservable(
    internalState.dndPreview.pipe(
      map((val) => {
        if (!val) return undefined;
        const { position } = val;
        if (position.layout !== element.getValue().id) return undefined;
        return position;
      }),
      distinctUntilChanged()
    ),
    null,
    [internalState.dndPreview, element]
  );
  const isDnd = useBehaviorSubject(internalState.isDnd);
  const layout = useBehaviorSubject(element.bs);
  const style = {
    minHeight: isDnd ? getYPadding(layout.style.padding) + 10 : 10,
  };

  const columnStyle = isDnd
    ? {
        outline: `1px dashed ${theme.color.surface.accentSecondary}`,
        outlineOffset: -1,
      }
    : {};
  return (
    <LayoutDumb
      element={layout}
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
