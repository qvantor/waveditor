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
import { PxValueEditor } from './components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface Props {
  text: TextStore;
}

export const TextParamsEditor = ({ text }: Props) => {
  return (
    <CollapseStyled>
      <Collapse.Panel key='text' header='Text'>
        <Root>
          <PxValueEditor
            text={text}
            selector={getElementFontSize}
            styleKey='fontSize'
            icon={<AiOutlineFontSize />}
          />
          <PxValueEditor
            text={text}
            selector={getElementLineHeight}
            styleKey='lineHeight'
            icon={<AiOutlineLineHeight />}
          />
          <PxValueEditor
            text={text}
            selector={getElementLetterSpacing}
            styleKey='letterSpacing'
            icon={<RxLetterSpacing />}
            min='-100'
            max='100'
            step='0.1'
          />
        </Root>
      </Collapse.Panel>
    </CollapseStyled>
  );
};
