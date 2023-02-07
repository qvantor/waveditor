import { useBehaviorSubject, useObservable } from '@waveditors/rxjs-react';
import { distinctUntilChanged, map } from 'rxjs';
import { useLayoutEditorContext } from '../hooks';
import { COLUMN_DATATYPE } from '../constants';
import { LayoutStore } from '../types';
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
        if (position.layout !== element.value.id) return undefined;
        return position;
      }),
      distinctUntilChanged()
    ),
    null
  );
  const isDnd = useBehaviorSubject(internalState.isDnd);
  const columnStyle = isDnd
    ? {
        outline: '1px dashed red',
        outlineOffset: -1,
      }
    : {};
  const layout = element.getValue();
  const columnWidth = width / layout.params.columns.length;
  return (
    <table style={{ borderSpacing: 0, minHeight: 10 }}>
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
