import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { useCallback } from 'react';
import { mapValue } from '@waveditors/utils';
import { match } from 'ts-pattern';
import styled from 'styled-components';
import { elementIdToDOMRect } from '../services';
import { useLayoutEditorContext } from '../hooks';

export const FrameRoot = styled.div`
  position: absolute;
  pointer-events: none;
  background: rgba(39, 174, 96, 0.3);
  outline: 2px solid rgba(39, 174, 96, 1);
  outline-offset: -2px;
`;

export const HoverFrame = () => {
  const { hover, selected } = useLayoutEditorContext();
  const selectedId = useBehaviorSubject(selected);

  const hoverIdToRect = useCallback(
    (value: string | null) =>
      mapValue(value, (value) =>
        // if selected and hovered is equal, hide hovered frame
        match(selectedId)
          .with(value, () => null)
          .otherwise(() => elementIdToDOMRect(value))
      ),
    [selectedId]
  );

  const rect = useBehaviorSubject(hover, hoverIdToRect);

  return mapValue(rect, ({ left, top, width, height }) => (
    <FrameRoot style={{ left, top, width, height }} />
  ));
};
