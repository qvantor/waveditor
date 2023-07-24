import { useBehaviorSubject, useObservable } from '@waveditors/rxjs-react';
import { distinctUntilChanged, map } from 'rxjs';
import { LayoutStore, SMALLEST_LAYOUT_SIZE } from '@waveditors/editor-model';
import { getYPadding } from '@waveditors/utils';
import { LayoutDumb } from '@waveditors/layout-render';
import { theme } from '@waveditors/theme';
import { useMemo } from 'react';
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

  const style = useMemo(() => {
    if (!isDnd) return undefined;
    return {
      minHeight: getYPadding(layout.style.padding) + SMALLEST_LAYOUT_SIZE,
    };
  }, [isDnd, layout.style.padding]);
  const columnsStyle = useMemo(() => {
    if (!isDnd) return undefined;
    return {
      outline: `1px dashed ${theme.color.border.primary}`,
      outlineOffset: -1,
    };
  }, [isDnd]);
  return (
    <LayoutDumb
      element={layout}
      style={style}
      renderColumn={(props) => (
        <Column
          style={columnsStyle}
          dndPreview={
            dndPreview?.column === props.index ? dndPreview : undefined
          }
          {...props}
        />
      )}
    />
  );
};
