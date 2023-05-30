import React, { useCallback } from 'react';
import styled from 'styled-components';
import { getElementColor, TextStore } from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import { ColorPicker } from '../../../../common/components';

const InternalPicker = styled(ColorPicker)`
  flex: 1;
`;

interface Props {
  text: TextStore;
}

export const Color = ({ text }: Props) => {
  const color = useBsSelector(text.bs, getElementColor);
  const onChange = useCallback(
    (value?: string) => text.actions.setStyle({ key: 'color', value }),
    [text]
  );
  return <InternalPicker value={color} onChange={onChange} />;
};
