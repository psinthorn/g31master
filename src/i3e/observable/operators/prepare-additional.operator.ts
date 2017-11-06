import { Observable } from 'rxjs/Observable';
import {
  extractAdditional,
  ExtractAdditionalFunction,
  ExtractAdditionalOperatorFunction,
} from './extract-additional.operator';

const prepareAdditionalFunction: ExtractAdditionalFunction<any, any> = <R>(data: R) => {
  return [data, {}];
};

export function prepareAdditional<R>(): ExtractAdditionalOperatorFunction<R, R> {
  return extractAdditional<R, R>(prepareAdditionalFunction);
}
