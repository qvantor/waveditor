import { Background } from '@waveditors/editor-model';
import { useCallback } from 'react';
import { Select } from 'antd';
import {
  BackgroundRepeatSelector,
  ImageUrlInput,
} from '../../../../common/components';
import { BuilderColorPicker } from '../../../common/components';
import { RowContainer, SimpleEditorRow } from './editor-row.styled';

interface Props {
  value?: Background;
  onChange: <K extends keyof Background>(value: {
    key: K;
    value: Background[K];
  }) => void;
}

const CoverOptions = [
  { value: 'cover', label: 'Cover' },
  { value: 'contain', label: 'Contain' },
];
const PositionOptions = [
  { value: 'center', label: 'Center' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
];
export const BackgroundEditor = ({ value, onChange }: Props) => {
  const onChangeInternal = useCallback(
    <K extends keyof Background>(key: K) =>
      (value: Background[K]) =>
        onChange({ key, value }),
    [onChange]
  );
  return (
    <RowContainer>
      <SimpleEditorRow>
        <div>Color</div>
        <BuilderColorPicker
          value={value?.backgroundColor}
          onChange={onChangeInternal('backgroundColor')}
        />
      </SimpleEditorRow>
      <SimpleEditorRow>
        <div>Image</div>
        <ImageUrlInput
          value={value?.backgroundImage}
          onChange={onChangeInternal('backgroundImage')}
        />
      </SimpleEditorRow>
      <SimpleEditorRow>
        <div>Repeat</div>
        <BackgroundRepeatSelector
          value={value?.backgroundRepeat}
          onChange={onChangeInternal('backgroundRepeat')}
        />
      </SimpleEditorRow>
      <SimpleEditorRow>
        <div>Size</div>
        <Select
          style={{ width: '100%' }}
          value={value?.backgroundSize}
          onChange={onChangeInternal('backgroundSize')}
          options={CoverOptions}
          size='small'
          allowClear
        />
      </SimpleEditorRow>
      <SimpleEditorRow>
        <div>Position</div>
        <Select
          style={{ width: '100%' }}
          value={value?.backgroundPosition}
          onChange={onChangeInternal('backgroundPosition')}
          options={PositionOptions}
          size='small'
          allowClear
        />
      </SimpleEditorRow>
    </RowContainer>
  );
};
