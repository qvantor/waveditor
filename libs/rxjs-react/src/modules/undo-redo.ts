import { filter, map, Subject, Unsubscribable, pipe } from 'rxjs';
import { notNullish } from '@waveditors/utils';
import { createStore } from '../services';
import { Effect } from '../types';

export interface CommonUndoEvent<T, V> {
  type: T;
  payload: { prev: V; next: V };
}

type EffectExtract<T, E> = Extract<E, { type: T }>;

export interface UndoRedoEffectConfig<
  V,
  E extends CommonUndoEvent<string, unknown>,
  T
> {
  filter?: (event: EffectExtract<T, E>, value: V) => boolean;
}

export interface UndoRedoModule<E extends CommonUndoEvent<string, unknown>>
  extends Unsubscribable {
  undo: Subject<void>;
  redo: Subject<void>;

  onChange: Subject<E>;
  onUndo: Subject<E>;
  onRedo: Subject<E>;

  setGroupSize: (value: number) => void;
  createUndoRedoEffect: <V, A, T extends string>(
    type: T,
    config?: UndoRedoEffectConfig<V, E, T>
  ) => () => Effect<V, A>;
}

type UndoRedoEvent<E> = { id: string; events: E[] };
type UndoRedoEvents<E> = UndoRedoEvent<E>[];
export const undoRedoModule = <
  E extends CommonUndoEvent<string, unknown>
>(): UndoRedoModule<E> => {
  const onChange = new Subject<E>();

  const undo = new Subject<void>();
  const onUndo = new Subject<E>();

  const redo = new Subject<void>();
  const onRedo = new Subject<E>();

  const groupSize = createStore<number>()
    .addActions({
      setValue: (value: number) => value,
      decrease: (_, value) => value - 1,
    })
    .run(0);

  // state
  const redoStore = createStore<UndoRedoEvents<E>>()
    .addActions({
      addEvent: (value: UndoRedoEvent<E>, state) => [...state, value],
      removeEvent: (eventId: string, state) =>
        state.filter((value) => value.id !== eventId),
    })
    .addEffect(() => ({
      subscriptions: ({ bs, actions }) => [
        redo
          .pipe(
            map(() => bs.value[bs.value.length - 1]),
            filter(notNullish)
          )
          .subscribe((lastAction) => {
            lastAction.events.reverse().forEach((event) => onRedo.next(event));
            actions.removeEvent(lastAction.id);
            undoStore.actions.addEvents(lastAction);
          }),
      ],
    }))
    .run([]);

  const undoStore = createStore<UndoRedoEvents<E>>()
    .addActions({
      addEvent: (event: E, state) => {
        const notGrouped = [
          ...state,
          {
            id: Math.random().toString(),
            events: [event],
          },
        ];
        if (groupSize.getValue() === 0) return notGrouped;
        groupSize.actions.decrease();
        return state.map((item, index) => {
          if (index !== state.length - 1) return item;
          return {
            ...item,
            events: [...item.events, event],
          };
        });
      },
      addEvents: (value: UndoRedoEvent<E>, state) => [...state, value],
      removeEvent: (eventId: string, state) =>
        state.filter((value) => value.id !== eventId),
    })
    .addEffect(() => ({
      subscriptions: ({ actions, bs }) => [
        undo
          .pipe(
            map(() => bs.value[bs.value.length - 1]),
            filter(notNullish)
          )
          .subscribe((lastAction) => {
            lastAction.events.reverse().forEach((event) => onUndo.next(event));
            actions.removeEvent(lastAction.id);
            redoStore.actions.addEvent(lastAction);
          }),
        onChange.subscribe(actions.addEvent),
      ],
    }))
    .run([]);
  const createUndoRedoEffect =
    <V, A, T extends E['type']>(
      type: T,
      config?: UndoRedoEffectConfig<V, E, T>
    ) =>
    (): Effect<V, A> => ({
      beforeAction: ({ bs, next }) => {
        onChange.next({
          type,
          payload: { prev: bs.value, next },
        } as unknown as E);
        return true;
      },
      subscriptions: ({ bs }) => {
        const undoRedoPipe = pipe(
          filter(
            (event: E): event is EffectExtract<T, E> => event.type === type
          ),
          filter((event) => config?.filter?.(event, bs.value) ?? true)
        );
        return [
          onUndo.pipe(undoRedoPipe).subscribe((event) => {
            bs.next(event.payload.prev as V);
          }),
          onRedo
            .pipe(undoRedoPipe)
            .subscribe((event) => bs.next(event.payload.next as V)),
        ];
      },
    });
  const unsubscribe = () => {
    redoStore.unsubscribe();
    undoStore.unsubscribe();
    groupSize.unsubscribe();
  };
  return {
    undo,
    redo,
    onUndo,
    onRedo,
    onChange,
    createUndoRedoEffect,
    setGroupSize: groupSize.actions.setValue,
    unsubscribe,
  };
};
