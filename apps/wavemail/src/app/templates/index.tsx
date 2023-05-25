import { Menu, MenuItem, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { createStore } from '@waveditors/rxjs-react';
import { useState } from 'react';
import { RenderContextObject } from '@waveditors/editor-model';
import { HeaderButton } from '../common/components';
import {
  getTemplates,
  getInitialTemplate,
  generateEmptyTemplate,
} from './services';
// @todo the whole templates domain is for demo only

export { useSaveRenderContext } from './hooks';

export const RenderContextStore = createStore<RenderContextObject>()
  .addActions({
    set: (value: RenderContextObject) => value,
  })
  .run(getInitialTemplate());

export const Templates = () => {
  const [state, setState] = useState(getTemplates());
  const onTemplateSelect = (id: string) => () =>
    RenderContextStore.actions.set(state[id]);
  return (
    <Menu
      menuButton={
        <HeaderButton onClick={() => setState(getTemplates())}>
          Templates
        </HeaderButton>
      }
      transition
    >
      {Object.values(state).map((template) => (
        <MenuItem
          key={template.config.rootElementId}
          onClick={onTemplateSelect(template.config.rootElementId)}
        >
          {template.config.name}
        </MenuItem>
      ))}
      <MenuDivider />
      <MenuItem
        onClick={() => RenderContextStore.actions.set(generateEmptyTemplate())}
      >
        <b>Create new template</b>
      </MenuItem>
    </Menu>
  );
};
