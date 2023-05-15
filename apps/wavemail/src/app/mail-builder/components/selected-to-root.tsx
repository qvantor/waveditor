import { map, merge, of, switchMap } from 'rxjs';
import { useBehaviorSubject, useObservable } from '@waveditors/rxjs-react';
import { getElementById, getElementParents } from '@waveditors/editor-model';
import styled, { css } from 'styled-components';
import { tokens, font } from '@waveditors/theme';
import { match, P } from 'ts-pattern';
import { useMailBuilderContext } from '../../common/hooks';

const Root = styled.div`
  display: flex;
`;

const Item = styled.div`
  line-height: calc(${tokens.size.footerHeight} - 1px);
  padding: 0 7px 0 23px;
  position: relative;
  ${font({ size: 'smallest' })}
`;

const Layout = styled(Item)<{ hover: boolean }>`
  cursor: pointer;

  ${({ hover }) =>
    hover
      ? css`
          background-color: #d1edda;

          &:after {
            border-left: 13px solid #d1edda !important;
          }
        `
      : ''}
  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    border-left: 13px solid white;
    right: -13px;
    top: 1px;
  }

  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
    border-left: 14px solid ${tokens.color.border.primary};
    right: -14px;
  }
`;

const Selected = styled(Item)`
  background: rgba(52, 152, 219, 0.2);

  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    border-left: 13px solid rgba(52, 152, 219, 0.2);
    right: -13px;
    top: 1px;
  }
`;

// todo move inside editor
export const SelectedToRoot = () => {
  const {
    config,
    stores: { elements, selected, hover },
  } = useMailBuilderContext();
  const hoverValue = useBehaviorSubject(hover.bs);
  const parents = useObservable(
    selected.bs.pipe(
      map((selected) => {
        if (!selected) return [];
        return getElementParents(selected)(elements.getValue()).reverse();
      })
    ),
    [],
    [selected.bs, elements.bs, config.bs]
  );
  const selectedElement = useObservable(
    merge(selected.bs, elements.bs).pipe(
      switchMap(() =>
        match(selected.getValue())
          .with(P.string, (id) =>
            of(getElementById(id)).pipe(
              map((getElement) => getElement(elements.getValue())),
              switchMap((elementStore) =>
                elementStore ? elementStore.bs : of(null)
              )
            )
          )
          .otherwise(() => of(null))
      )
    ),
    null,
    [selected, elements]
  );
  if (!selectedElement) return null;
  return (
    <Root>
      {parents.map((layout, i) => {
        const value = layout.getValue();
        return (
          <Layout
            hover={hoverValue === value.id}
            key={value.id}
            onMouseEnter={() => hover.actions.addHover(value.id)}
            onClick={() => selected.actions.setSelected(value.id)}
            onMouseLeave={hover.actions.removeHover}
          >
            {value.name ?? (i === 0 ? 'root' : value.type)}
          </Layout>
        );
      })}
      <Selected>{selectedElement.name ?? selectedElement.type}</Selected>
    </Root>
  );
};
