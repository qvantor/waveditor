import React from 'react';
import { Collapse } from 'antd';
import {
  getElementFontSize,
  getElementLetterSpacing,
  getElementLineHeight,
  TextStore,
} from '@waveditors/editor-model';
import { AiOutlineFontSize, AiOutlineLineHeight } from 'react-icons/ai';
import { RxLetterSpacing } from 'react-icons/rx';
import styled from 'styled-components';
import { CollapseStyled } from '../../../../common/components';
import { Font } from '../common/components';
import { SimpleEditorRow, RowContainer } from '../../common/components';
import { Color, PxValue, TextAlign } from './components';

const Params = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

interface Props {
  text: TextStore;
}

export const TextParamsEditor = ({ text }: Props) => {
  return (
    <CollapseStyled name='text-editor'>
      <Collapse.Panel key='font-family' header='Font Family'>
        <Font element={text} />
      </Collapse.Panel>
      <Collapse.Panel key='text' header='Text'>
        <RowContainer>
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
            <TextAlign text={text} />
          </Params>
          <SimpleEditorRow half>
            <div>Color</div>
            <Color text={text} />
          </SimpleEditorRow>
        </RowContainer>
      </Collapse.Panel>
    </CollapseStyled>
  );
};
