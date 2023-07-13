import { map, merge } from 'rxjs';
import {
  addConfigFont,
  ElementStore,
  getConfigFontById,
  getConfigFonts,
  getElementFontRelationByElementId,
  getTemplateDefaultFont,
  removeConfigFontById,
  useAction,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useBsSelector, useObservable } from '@waveditors/rxjs-react';
import { FontSelector } from './font-selector';

interface Props {
  element: ElementStore;
}

export const Font = ({ element }: Props) => {
  const {
    model: { config, relations },
  } = useBuilderContext();
  const createFont = useAction(addConfigFont);
  const removeFont = useAction(removeConfigFontById);
  const elementFont = useObservable(
    merge(relations.bs, config.bs).pipe(
      map(() =>
        getElementFontRelationByElementId(element.getValue().id)(
          relations.getValue()
        )
      ),
      map((relation) =>
        relation ? getConfigFontById(relation)(config.getValue()) ?? null : null
      )
    ),
    null,
    [relations.bs, config.bs]
  );

  // @todo here should be font from closest parent
  const inheritedFont = useBsSelector(config.bs, getTemplateDefaultFont);
  const fonts = useBsSelector(config.bs, getConfigFonts);

  const font = elementFont || inheritedFont;
  return (
    <FontSelector
      value={font}
      fonts={fonts}
      inherited={!elementFont}
      onSelected={(font) =>
        relations.actions.addElementFontRelation({
          font,
          element: element.getValue().id,
        })
      }
      onFontCreate={(font) => createFont(font, element.getValue().id)}
      onFontRemove={removeFont}
      onFontChange={config.actions.setFont}
    />
  );
};
