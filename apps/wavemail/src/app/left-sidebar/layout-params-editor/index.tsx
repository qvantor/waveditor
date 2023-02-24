import { LayoutStore } from '@waveditors/editor-model';
import { ColumnsEditor } from './components';

interface Props {
  layout: LayoutStore;
}

export const LayoutParamsEditor = ({ layout }: Props) => {
  return <ColumnsEditor layout={layout} />;
};
