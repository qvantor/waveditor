import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  TextStore,
  getElementColor,
  selectorToPipe,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { ColorPicker } from '../../../common/components';

const InternalPicker = styled(ColorPicker)`
  flex: 1;
`;

interface Props {
  text: TextStore;
}

export const Color = ({ text }: Props) => {
  const color = useObservable(
    text.bs.pipe(selectorToPipe(getElementColor)),
    getElementColor(text.getValue())
  );
  const onChange = useCallback(
    (value?: string) => text.actions.setStyle({ key: 'color', value }),
    [text]
  );
  return <InternalPicker value={color} onChange={onChange} />;
};
