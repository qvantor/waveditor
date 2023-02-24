import { useState } from 'react';
import { Background } from '@waveditors/editor-model';
import { ColorPicker } from '../../../common/components';

interface Props {
  value?: Background;
  onChange: <K extends keyof Background>(value: {
    key: K;
    value: Background[K];
  }) => void;
}

export const BackgroundEditor = ({ value, onChange }: Props) => {
  const [color, setColor] = useState<string | undefined>(undefined);
  return (
    <div style={{ padding: 5 }}>
      <ColorPicker value={color} onChange={setColor} />
    </div>
  );
};
