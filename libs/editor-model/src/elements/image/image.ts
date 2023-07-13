import { selectorToPipe, StoreResult } from '@waveditors/rxjs-react';
import { catchError, filter, from, map, of, switchMap } from 'rxjs';
import { deepEqual } from 'fast-equals';
import { elementStore, ElementStoreDeps } from '../element';
import type { Image } from './image.types';
import { getImageMeta, getImageUrl } from './image.selectors';

const getImageSize = (url: string) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    );
    img.addEventListener('error', reject);
    img.src = url;
  });

export const imageStore = (_: ElementStoreDeps) =>
  elementStore<Image>()
    .addActions({
      setImageUrl: (url: string, image) => ({
        ...image,
        params: {
          ...image.params,
          url,
        },
      }),
      setMeta: (meta: Image['meta'], image) => ({ ...image, meta }),
    })
    .addEffect(() => ({
      subscriptions: ({ bs, actions }) => [
        // calculate width and height for new image url
        bs
          .pipe(
            selectorToPipe(getImageUrl),
            map(getImageSize),
            switchMap((promise) =>
              from(promise).pipe(catchError(() => of(undefined)))
            ),
            filter((value) => !deepEqual(value, getImageMeta(bs.getValue())))
          )
          .subscribe(actions.setMeta),
      ],
    }));
export type ImageStore = StoreResult<typeof imageStore>;
