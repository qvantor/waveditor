import { Collapse } from 'antd';
import { LayoutStore } from '@waveditors/editor-model';
import { CollapseStyled } from '../../../../common/components';
import { LayoutEditor, ColumnsEditor } from './components';

interface Props {
  layout: LayoutStore;
}

export const LayoutParamsEditor = ({ layout }: Props) => (
  <CollapseStyled name='layout-editor'>
    <Collapse.Panel key='layout' header='Layout'>
      <LayoutEditor layout={layout} />
    </Collapse.Panel>

    <Collapse.Panel key='columns' header='Columns'>
      <ColumnsEditor layout={layout} />
    </Collapse.Panel>
  </CollapseStyled>
);
