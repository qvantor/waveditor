import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { createStore } from '@waveditors/rxjs-react';
import { RenderContextObject } from '@waveditors/layout-render';
import { useState } from 'react';
import { HeaderButton } from '../common/components';
import { getTemplates, getInitialTemplate } from './hooks';
// @todo the whole templates domain is for demo only

export { useSaveRenderContext } from './hooks';

export const RenderContextStore = createStore<RenderContextObject>()
  .addActions({
    set: (value: RenderContextObject) => value,
  })
  .run(getInitialTemplate());

export const Templates = () => {
  const [state, setState] = useState(getTemplates());
  const onTemplateSelect = (key: string) => () =>
    RenderContextStore.actions.set(state[key]);
  return (
    <Menu
      menuButton={
        <HeaderButton onClick={() => setState(getTemplates())}>
          Templates
        </HeaderButton>
      }
      transition
    >
      {Object.keys(state).map((key) => (
        <MenuItem key={key} onClick={onTemplateSelect(key)}>
          {key}
        </MenuItem>
      ))}
    </Menu>
  );
};
