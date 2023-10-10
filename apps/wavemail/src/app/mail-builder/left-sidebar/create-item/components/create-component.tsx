import {
  createStore,
  useBehaviorSubject,
  useObservable,
  useSubscription,
} from '@waveditors/rxjs-react';
import { EditorSnapshot } from '@waveditors/editor-model';
import { useRef } from 'react';
import { debounceTime, filter, fromEvent, map, merge, of } from 'rxjs';
import { calcScrollbarWidth } from '@waveditors/utils';
import styled from 'styled-components';
import { Spin } from 'antd';
import { useComponentsLazyQuery } from '../graphql/components.g';
import { PADDING } from '../constants';
import { TagsSelector } from './tags-selector';
import { ComponentsList } from './components-list';

const tags = createStore<number[]>()
  .addActions({
    setTags: (value: number[]) => value,
  })
  .run([]);

const scrollbarWidth = calcScrollbarWidth();

const Root = styled.div`
  height: 100%;
  overflow: hidden;
  text-align: center;
`;

export const CreateComponent = ({
  onMouseDown,
  onClick,
}: {
  onMouseDown: (component: EditorSnapshot) => void;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fetch, { data }] = useComponentsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const tagsList = useBehaviorSubject(tags.bs);
  useSubscription(
    () =>
      tags.bs.subscribe((tags) => {
        fetch({ variables: { tags } });
      }),
    []
  );

  const size = useObservable(
    merge(fromEvent(window, 'resize').pipe(debounceTime(300)), of(null)).pipe(
      map(() => ref.current),
      filter(Boolean),
      map((value) => [value.offsetWidth, value.offsetHeight])
    ),
    null
  );
  return (
    <>
      <TagsSelector value={tagsList} onChange={tags.actions.setTags} />
      <Root ref={ref}>
        {data?.components && size ? (
          <ComponentsList
            onMouseDown={onMouseDown}
            onClick={onClick}
            components={data.components}
            width={size[0] - PADDING * 2 - scrollbarWidth}
            height={size[1]}
          />
        ) : (
          <Spin />
        )}
      </Root>
    </>
  );
};
