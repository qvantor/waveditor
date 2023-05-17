import { Collapse } from 'antd';
import { ImageStore } from '@waveditors/editor-model';
import { CollapseStyled } from '../../../common/components';
import { ImageUrlEditor } from './component';

interface Props {
  image: ImageStore;
}

export const ImageParamsEditor = ({ image }: Props) => {
  return (
    <CollapseStyled name='image-editor'>
      <Collapse.Panel key='image' header='Image'>
        <ImageUrlEditor image={image} />
      </Collapse.Panel>
    </CollapseStyled>
  );
};
