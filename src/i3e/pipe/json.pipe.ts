/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Pipe, PipeTransform} from '@angular/core';

/**
 * @ngModule CommonModule
 * @whatItDoes Converts value into JSON string.
 * @howToUse `expression | json`
 * @description
 *
 * Converts value into string using `JSON.stringify`. Useful for debugging.
 *
 * ### Example
 * {@example common/pipes/ts/json_pipe.ts region='JsonPipe'}
 *
 * @stable
 */
@Pipe({name: 'i3eJson', pure: false})
export class JsonPipe implements PipeTransform {
  transform(value: any): string {
    const converteds = [];
    return JSON.stringify(value, (key, value) => {
      if((value !== null) && (typeof value === 'object')) {
        if (converteds.indexOf(value) >= 0) return value.toString();
        converteds.push(value);
      }

      return value;
    }, 2);
  }
}
