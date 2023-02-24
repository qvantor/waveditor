import styled from 'styled-components';
import { Background } from '@waveditors/editor-model';
import { useCallback } from 'react';
import {
  ColorPicker,
  ImageUrlInput,
  BackgroundRepeatSelector,
} from '../../../common/components';

interface Props {
  value?: Background;
  onChange: <K extends keyof Background>(value: {
    key: K;
    value: Background[K];
  }) => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
`;

const BackgroundEditorRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: center;
`;

export const BackgroundEditor = ({ value, onChange }: Props) => {
  const onChangeInternal = useCallback(
    <K extends keyof Background>(key: K) =>
      (value: Background[K]) =>
        onChange({ key, value }),
    [onChange]
  );
  return (
    <Root>
      <BackgroundEditorRow>
        <div>Color</div>
        <ColorPicker
          value={value?.backgroundColor}
          onChange={onChangeInternal('backgroundColor')}
        />
      </BackgroundEditorRow>
      <BackgroundEditorRow>
        <div>Image</div>
        <ImageUrlInput
          value={value?.backgroundImage}
          onChange={onChangeInternal('backgroundImage')}
        />
      </BackgroundEditorRow>
      <BackgroundEditorRow>
        <div>Repeat</div>
        <BackgroundRepeatSelector
          value={value?.backgroundRepeat}
          onChange={onChangeInternal('backgroundRepeat')}
        />
      </BackgroundEditorRow>
    </Root>
  );
};
