import styled from 'styled-components';
import { EmptyPattern, font, tokens } from '@waveditors/theme';
import { useBsSelector } from '@waveditors/rxjs-react';
import {
  getImageMeta,
  getImageUrl,
  ImageStore,
} from '@waveditors/editor-model';
import { Input } from '../../../common/components';

interface Props {
  image: ImageStore;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  ${EmptyPattern};
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 150px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
`;
const ImageMetaRoot = styled.div`
  position: absolute;
  left: 3px;
  top: 0;
  ${font({ size: 'small' })};
  color: ${tokens.color.text.secondary};
`;

const ImageMeta = ({ image }: Props) => {
  const meta = useBsSelector(image.bs, getImageMeta);
  if (!meta) return null;
  return (
    <ImageMetaRoot>
      {meta.width}x{meta.height}
    </ImageMetaRoot>
  );
};

export const ImageUrlEditor = ({ image }: Props) => {
  const url = useBsSelector(image.bs, getImageUrl);
  return (
    <Root>
      <ImagePreviewContainer>
        <ImageMeta image={image} />
        <ImagePreview style={{ backgroundImage: `url(${url})` }} />
      </ImagePreviewContainer>
      <Input
        value={url}
        onChange={(url) => image.actions.setImageUrl(url ?? '')}
      />
    </Root>
  );
};
