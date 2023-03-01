import { StoreResult } from '@waveditors/rxjs-react';
import { switchMap, map, from, catchError, of } from 'rxjs';
import { elementStore, ElementStoreDeps } from '../element';
import { commonUndoRedoEffect } from '../../services';
import type { Image } from './image.types';
import { imageUrlPipe } from './image.selectors';

const getImageSize = (url: string) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    );
    img.addEventListener('error', reject);
    img.src = url;
  });

export const imageStore = (deps: ElementStoreDeps) =>
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
          .pipe(imageUrlPipe)
          .pipe(
            map(getImageSize),
            switchMap((promise) =>
              from(promise).pipe(catchError(() => of(undefined)))
            )
          )
          .subscribe(actions.setMeta),
      ],
    }))
    .addEffect(
      commonUndoRedoEffect(deps.undoRedo, { filterActions: ['setMeta'] })
    );
export type ImageStore = StoreResult<typeof imageStore>;
