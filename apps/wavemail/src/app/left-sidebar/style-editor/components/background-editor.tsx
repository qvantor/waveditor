import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import styled from 'styled-components';
import { Background } from '@waveditors/editor-model';
import { ColorPicker } from '../../../common/components';

interface Props {
  value?: Background;
  onChange: <K extends keyof Background>(value: {
    key: K;
    value: Background[K];
  }) => void;
}

const Root = styled.div`
  padding: 5px;
`;

const BackgroundEditorRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: center;
`;

export const BackgroundEditor = ({ value, onChange }: Props) => {
  const [color, setColor] = useState(value?.backgroundColor);

  useDebounce(() => onChange({ key: 'backgroundColor', value: color }), 400, [
    color,
  ]);
  useEffect(() => {
    if (value?.backgroundColor !== color) setColor(value?.backgroundColor);
  }, [value?.backgroundColor]);

  return (
    <Root>
      <BackgroundEditorRow>
        <div>Color</div>
        <ColorPicker value={color} onChange={setColor} />
      </BackgroundEditorRow>
    </Root>
  );
};
