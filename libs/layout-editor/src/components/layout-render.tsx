import { useBehaviorSubject, useObservable } from '@waveditors/rxjs-react';
import { distinctUntilChanged, map } from 'rxjs';
import { LayoutStore, styleMapper } from '@waveditors/editor-model';
import { useLayoutEditorContext } from '../hooks';
import { COLUMN_DATATYPE } from '../constants';
import { RenderColumn } from './render-column';

interface Props {
  element: LayoutStore;
  width: number;
}

export const LayoutRender = ({ element, width }: Props) => {
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
  const columnStyle = isDnd
    ? {
        outline: '1px dashed red',
        outlineOffset: -1,
      }
    : {};
  const columnWidth = width / layout.params.columns.length;

  return (
    <table
      style={{
        borderSpacing: 0,
        minHeight: 10,
        background: 'white',
        ...styleMapper(layout.style),
      }}
    >
      <tbody>
        <tr>
          {layout.params.columns.map((column, i) => {
            return (
              <td
                style={{
                  ...columnStyle,
                  padding: 0,
                }}
                datatype={COLUMN_DATATYPE}
                data-column={i}
                key={i}
              >
                <RenderColumn
                  width={columnWidth}
                  column={column}
                  dndPreview={dndPreview?.column === i ? dndPreview : undefined}
                />
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};
