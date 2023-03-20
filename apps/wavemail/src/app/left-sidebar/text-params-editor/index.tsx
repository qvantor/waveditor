import React from 'react';
import { Collapse } from 'antd';
import {
  getElementFontSize,
  getElementLineHeight,
  getElementLetterSpacing,
  TextStore,
} from '@waveditors/editor-model';
import { AiOutlineFontSize, AiOutlineLineHeight } from 'react-icons/ai';
import { RxLetterSpacing } from 'react-icons/rx';
import styled from 'styled-components';
import { CollapseStyled } from '../../common/components';
import { Font } from "../common/components";
import { PxValue, TextAlign, Color } from './components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Params = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

const PairedCell = styled.div`
  display: flex;
  gap: 5px;
`;

interface Props {
  text: TextStore;
}

export const TextParamsEditor = ({ text }: Props) => {
  return (
    <CollapseStyled>
      <Collapse.Panel key='font-family' header='Font Family'>
        <Font element={text} />
      </Collapse.Panel>
      <Collapse.Panel key='text' header='Text'>
        <Root>
          <Params>
            <PxValue
              text={text}
              selector={getElementFontSize}
              styleKey='fontSize'
              icon={<AiOutlineFontSize />}
            />
            <PxValue
              text={text}
              selector={getElementLineHeight}
              styleKey='lineHeight'
              icon={<AiOutlineLineHeight />}
            />
            <PxValue
              text={text}
              selector={getElementLetterSpacing}
              styleKey='letterSpacing'
              icon={<RxLetterSpacing />}
              min='-100'
              max='100'
              step='0.1'
            />
            <PairedCell>
              <TextAlign text={text} />
              <Color text={text} />
            </PairedCell>
          </Params>
        </Root>
      </Collapse.Panel>
    </CollapseStyled>
  );
};
