import styled from 'styled-components';
import { Background } from '@waveditors/editor-model';
import { ColorPicker, ImagePicker } from '../../../common/components';

interface Props {
  value?: Background;
  onChange: <K extends keyof Background>(value: {
    key: K;
    value: Background[K];
  }) => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
`;

const BackgroundEditorRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: center;
`;

export const BackgroundEditor = ({ value, onChange }: Props) => {
  // const [color, setColor] = useState(value?.backgroundColor);
  //
  // useDebounce(() => onChange({ key: 'backgroundColor', value: color }), 300, [
  //   color,
  // ]);
  // useEffect(() => {
  //   if (value?.backgroundColor !== color) setColor(value?.backgroundColor);
  // }, [value?.backgroundColor]);

  return (
    <Root>
      <BackgroundEditorRow>
        <div>Color</div>
        <ColorPicker
          value={value?.backgroundColor}
          onChange={(value) => onChange({ key: 'backgroundColor', value })}
        />
      </BackgroundEditorRow>
      <BackgroundEditorRow>
        <div>Image</div>
        <ImagePicker
          value={value?.backgroundImage}
          onChange={(value) => onChange({ key: 'backgroundImage', value })}
        />
      </BackgroundEditorRow>
    </Root>
  );
};
