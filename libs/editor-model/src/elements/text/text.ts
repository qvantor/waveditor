import { StoreResult } from '@waveditors/rxjs-react';
import { JSONContent } from '@tiptap/core';
import { elementStore, ElementStoreDeps } from '../element';
import { Text } from './text.types';
import { content as contentLens } from './text.lens';

export const textStore = (deps: ElementStoreDeps) =>
  elementStore<Text>()
    .addActions({
      setContent: (content: JSONContent, text: Text) =>
        contentLens.set(content)(text),
    })
    // .addEffect(() => ({
    //   subscriptions: (config) => [
    //     // subscription for update variables in text nodes
    //     // @todo refactor is needed
    //     deps.variables.bs.subscribe((variables) => {
    //       const content = getTextContent(config.bs.value);
    //       const mapped = mapJSONContent(content, (value) => {
    //         if (value.type !== 'variable') return value;
    //         if (value.attrs?.id) {
    //           const variable = getVariableById(value.attrs?.id)(variables);
    //           if (variable)
    //             return {
    //               ...value,
    //               attrs: { ...value.attrs, label: variable.label },
    //             };
    //           else return null as any;
    //         }
    //         return value;
    //       });
    //       const filtered = filterJSONContent(mapped, (val) => val !== null);
    //       if (deepEqual(filtered, content)) return;
    //       config.bs.next(contentLens.set(filtered)(config.bs.value));
    //     }),
    //   ],
    // }));
export type TextStore = StoreResult<typeof textStore>;
