import {
  createStore,
  useBehaviorSubject,
  useObservable,
  useSubscription,
} from '@waveditors/rxjs-react';
import { EditorSnapshot } from '@waveditors/editor-model';
import { useMemo, useRef } from 'react';
import { debounceTime, filter, fromEvent, map, merge, of } from 'rxjs';
import { useComponentsLazyQuery } from '../graphql/components.g';
import { PADDING } from '../constants';
import { TagsSelector } from './tags-selector';
import { ComponentsList } from './components-list';

const tags = createStore<number[]>()
  .addActions({
    setTags: (value: number[]) => value,
  })
  .run([]);

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
  const scrollbarWidth = useMemo(() => {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode?.removeChild(outer);

    return scrollbarWidth;
  }, []);

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
      <div style={{ height: '100%', overflow: 'hidden' }} ref={ref}>
        {data?.components && size ? (
          <ComponentsList
            onMouseDown={onMouseDown}
            onClick={onClick}
            components={data.components}
            width={size[0] - PADDING * 2 - scrollbarWidth}
            h={size[1]}
          />
        ) : null}
      </div>
    </>
  );
};
