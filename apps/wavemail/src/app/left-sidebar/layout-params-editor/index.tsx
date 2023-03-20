import { Collapse } from 'antd';
import { LayoutStore } from '@waveditors/editor-model';
import { CollapseStyled } from '../../common/components';
import { ColumnsEditor } from './components';

interface Props {
  layout: LayoutStore;
}

export const LayoutParamsEditor = ({ layout }: Props) => {
  return (
    <CollapseStyled>
      <Collapse.Panel key='layout' header='Layout'>
        <ColumnsEditor layout={layout} />
      </Collapse.Panel>
    </CollapseStyled>
  );
};
