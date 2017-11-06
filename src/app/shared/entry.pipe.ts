import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entry',
})
export class EntryPipe implements PipeTransform {
  transform(value: {[key: string]: any}): { key: string; value: any }[] {
    let entries: { key: string; value: any }[] = [];
    Object.keys(value || {}).forEach((key) => {
      entries.push({
        key: key,
        value: value[key],
      });
    });
    return entries;
  }
}
