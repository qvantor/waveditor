import { addPx, removePx } from '@waveditors/utils';
import { useCallback, useMemo } from 'react';
import { Dimensions } from '@waveditors/editor-model';
import { SimpleEditorRow, RowContainer } from '../../../common/components';
import { InputNumber } from '../../../../../common/components';

type SizeKey = 'width' | 'height';

interface Props {
  width?: string;
  height?: string;
  onChange: (value: { key: SizeKey; value: string | undefined }) => void;
  dimensions: Dimensions[];
}

export const SizeEditor = ({ width, height, onChange, dimensions }: Props) => {
  const onChangeInternal = useCallback(
    (key: SizeKey) => (value?: string) =>
      onChange({ key, value: value ? addPx(value) : undefined }),
    [onChange]
  );
  const { withWidth, withHeight } = useMemo(
    () => ({
      withWidth: dimensions.includes('w'),
      withHeight: dimensions.includes('h'),
    }),
    [dimensions]
  );
  return (
    <RowContainer>
      {withWidth && (
        <SimpleEditorRow>
          <div>Width</div>
          <InputNumber
            value={width ? removePx(width) : undefined}
            placeholder='auto'
            addonAfter='px'
            onChange={onChangeInternal('width')}
          />
        </SimpleEditorRow>
      )}
      {withHeight && (
        <SimpleEditorRow>
          <div>Height</div>
          <InputNumber
            value={height ? removePx(height) : undefined}
            placeholder='auto'
            addonAfter='px'
            onChange={onChangeInternal('height')}
          />
        </SimpleEditorRow>
      )}
    </RowContainer>
  );
};
