import { useBuilderContext } from '@waveditors/editor-model';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { useMemo } from 'react';
import { pipe } from 'fp-ts/function';
import { sort, map } from 'fp-ts/Array';
import { Ord } from 'fp-ts/string';
import { ColorPicker, ColorPickerProps } from '../../../common/components';

type Props = Omit<ColorPickerProps, 'colors'>;
export const BuilderColorPicker = (props: Props) => {
  const {
    module: { usedColors },
  } = useBuilderContext();
  const colors = useBehaviorSubject(usedColors.colors.bs);
  const colorsOrd = useMemo(
    () =>
      pipe(
        colors,
        (rest) => rest.slice(-20),
        map(([color]) => color),
        sort(Ord)
      ),
    [colors]
  );
  return <ColorPicker colors={colorsOrd} {...props} />;
};
