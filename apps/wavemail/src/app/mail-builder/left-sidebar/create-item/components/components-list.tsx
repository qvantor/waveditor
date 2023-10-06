import { EditorSnapshot } from '@waveditors/editor-model';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styled from 'styled-components';
import { useBsSelector } from '@waveditors/rxjs-react';
import { ComponentsQuery } from '../graphql/components.g';
import { MIN_SIZE, MAX_SIZE, PADDING } from '../constants';
import { authStore, getUserFromToken } from '../../../../auth';
import { ComponentPreview } from './component-preview';

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const calcComponentSize = (
  component: ComponentsQuery['components'][number],
  viewportWidth: number
) => {
  const componentWidth = component.json.config.viewportWidth as number;
  const scale = Math.min(viewportWidth / componentWidth, 1);
  const height = Math.min(
    Math.max(component.previewHeight * scale, MIN_SIZE),
    MAX_SIZE
  );
  return { height, scale };
};
export const ComponentsList = ({
  components,
  width,
  height,
  onMouseDown,
  onClick,
}: {
  components: ComponentsQuery['components'];
  width: number;
  height: number;
  onMouseDown: (component: EditorSnapshot) => void;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const user = useBsSelector(authStore.bs, getUserFromToken);
  const rows = useVirtualizer({
    count: components.length,
    getScrollElement: () => ref.current,
    estimateSize: (i) =>
      calcComponentSize(components[i], width).height + PADDING,
  });
  return (
    <Container style={{ height }} ref={ref}>
      <div
        style={{
          height: `${rows.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rows.getVirtualItems().map((virtualRow) => {
          const component = components[virtualRow.index];
          const { height, scale } = calcComponentSize(component, width);
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: PADDING,
                width,
                height,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              onMouseDown={() => onMouseDown(component.json)}
              onClick={onClick}
            >
              <ComponentPreview
                component={components[virtualRow.index]}
                height={height}
                scale={scale}
                edit={user?.id === component.userId}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};
