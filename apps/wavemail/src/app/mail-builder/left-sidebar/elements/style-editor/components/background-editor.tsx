import { Background } from '@waveditors/editor-model';
import { useCallback } from 'react';
import {
  BackgroundRepeatSelector,
  ColorPicker,
  ImageUrlInput,
} from '../../../../../common/components';
import { RowContainer, SimpleEditorRow } from '../../../common/components';

interface Props {
  value?: Background;
  onChange: <K extends keyof Background>(value: {
    key: K;
    value: Background[K];
  }) => void;
}

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
        <ColorPicker
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
    </RowContainer>
  );
};
