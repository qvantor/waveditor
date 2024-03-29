import { useBsSelector } from '@waveditors/rxjs-react';
import {
  getColumnsCount,
  getElementStyle,
  getGap,
  LayoutStore,
} from '@waveditors/editor-model';
import { InputNumber } from '@waveditors/ui-kit';
import { RowContainer, SimpleEditorRow } from '../../../common/components';
import { VerticalAlignEditor, AlignEditor } from '../../common/components';
import { minValue } from '../../../../../common/services';

interface Props {
  layout: LayoutStore;
}

export const LayoutEditor = ({ layout }: Props) => {
  const style = useBsSelector(layout.bs, getElementStyle);
  const gap = useBsSelector(layout.bs, getGap);
  const colCount = useBsSelector(layout.bs, getColumnsCount);
  return (
    <RowContainer>
      <SimpleEditorRow>
        <div>Align</div>
        <AlignEditor
          value={style.textAlign}
          onChange={(value) =>
            layout.actions.setStyle({ key: 'textAlign', value })
          }
        />
      </SimpleEditorRow>
      <SimpleEditorRow>
        <div>Vertical align</div>
        <VerticalAlignEditor
          value={style.verticalAlign}
          onChange={(value) =>
            layout.actions.setStyle({ key: 'verticalAlign', value })
          }
        />
      </SimpleEditorRow>
      <SimpleEditorRow>
        <div>Gap</div>
        <InputNumber
          value={gap}
          onChange={layout.actions.setGap}
          addonAfter='px'
          placeholder='0'
          validate={minValue(0)}
          disabled={colCount <= 1}
        />
      </SimpleEditorRow>
    </RowContainer>
  );
};
