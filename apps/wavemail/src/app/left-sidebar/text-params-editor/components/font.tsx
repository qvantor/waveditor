import styled from 'styled-components';
import { map, merge } from 'rxjs';
import { Popover, Select } from 'antd';
import {
  ElementStore,
  getTemplateConfigFonts,
  getTemplateConfigFontById,
  getElementFontRelationByElementId,
  selectorToPipe,
  getTemplateDefaultFont,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { tokens, font } from '@waveditors/theme';
import { useMailBuilderContext } from '../../../common/hooks';
import { FontName, FontEditor } from '../../common/components';

const Root = styled.div`
  height: 22px;
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
  padding: 0 4px;
  ${font({ size: 'small' })}
`;

const PopoverRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 240px;
`;

const FontSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface Props {
  element: ElementStore;
}

export const Font = ({ element }: Props) => {
  const {
    config,
    stores: { relations },
  } = useMailBuilderContext();
  const elementFont = useObservable(
    merge(relations.bs, config.bs).pipe(
      map(() =>
        getElementFontRelationByElementId(element.getValue().id)(
          relations.getValue()
        )
      ),
      map((relation) =>
        relation
          ? getTemplateConfigFontById(relation)(config.getValue()) ?? null
          : null
      )
    ),
    null,
    [element]
  );

  // @todo here should be font from closest parent
  const inheritedFont = useObservable(
    config.bs.pipe(selectorToPipe(getTemplateDefaultFont)),
    getTemplateDefaultFont(config.getValue()),
    [config]
  );

  const fonts = useObservable(
    config.bs.pipe(selectorToPipe(getTemplateConfigFonts)),
    getTemplateConfigFonts(config.getValue()),
    [config]
  );
  const font = elementFont || inheritedFont;
  return (
    <Popover
      placement='rightBottom'
      content={
        <PopoverRoot>
          <FontSelectContainer>
            <Select
              size='small'
              value={font.id}
              options={fonts.map((font) => ({
                label: <FontName font={font} />,
                value: font.id,
              }))}
              onChange={(font) =>
                relations.actions.addElementFontRelation({
                  font,
                  element: element.getValue().id,
                })
              }
              allowClear={!!elementFont}
            />
          </FontSelectContainer>
          <FontEditor
            font={font}
            elementId={element.getValue().id}
            fontCount={fonts.length}
          />
        </PopoverRoot>
      }
      trigger='click'
    >
      <Root>
        <FontName font={font} inherited={!elementFont} />
      </Root>
    </Popover>
  );
};
