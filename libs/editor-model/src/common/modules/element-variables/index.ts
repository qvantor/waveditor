import {
  BehaviorSubject,
  map,
  filter,
  switchMap,
  skip,
  distinctUntilChanged,
} from 'rxjs';
import { deepEqual } from 'fast-equals';
import { isNonEmpty, filter as arrayFilter } from 'fp-ts/Array';
import { ElementCommon } from '../../../elements';
import { VariablesStore } from '../../../variables';
import { extractVariablesFromElement } from './extract-variables-from-element';
import { applyVariablesToElement } from './apply-variables-to-element';

// effect to reactively connect variables and elements
export const variableElementRelationEffect =
  (variables: VariablesStore) => () => {
    return {
      subscriptions: ({ bs }: { bs: BehaviorSubject<ElementCommon> }) => [
        bs
          .pipe(
            map(extractVariablesFromElement), // select all used variables references from element
            filter((val) => isNonEmpty(val)),
            switchMap(
              (
                varIds: string[] // subscribe on used variables changes
              ) =>
                variables.bs.pipe(
                  map(arrayFilter((variable) => varIds.includes(variable.id))),
                  distinctUntilChanged(deepEqual),
                  skip(1)
                )
            ),
            map((variables) =>
              applyVariablesToElement(variables, bs.getValue())
            ),
            filter(Boolean)
          )
          .subscribe((value) => bs.next(value)),
      ],
    };
  };
