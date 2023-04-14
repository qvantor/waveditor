import { useCallback } from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';
import { font } from '@waveditors/theme';
import { createStore, useBsSelector } from '@waveditors/rxjs-react';

export const Root = styled(Collapse)`
  border: none;
  border-radius: 0;
  ${font({ size: 'small' })};
`;

// simple store for storing open collapsible
type Store = Record<string, string[]>;
const collapsedStore = createStore<Store>()
  .addActions({
    setValues: ([key, value]: [string, string[] | string], prev) => ({
      ...prev,
      [key]: Array.isArray(value) ? value : [value],
    }),
  })
  .run({});
const getValuesByName =
  (name: string) =>
  (value: Store): string[] =>
    value[name] ?? [];

export const CollapseStyled = ({
  name,
  ...rest
}: Parameters<typeof Collapse>[0] & { name: string }) => {
  const activeKey = useBsSelector(collapsedStore.bs, getValuesByName(name));
  const onChange = useCallback(
    (name: string) => (value: string[] | string) =>
      collapsedStore.actions.setValues([name, value]),
    []
  );

  return (
    <Root
      size='small'
      onChange={onChange(name)}
      activeKey={activeKey}
      {...rest}
    />
  );
};
