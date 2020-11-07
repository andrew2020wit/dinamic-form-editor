import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToLocalTime',
})
export class UtcToLocalTimePipe implements PipeTransform {
  transform(date: number | string | Date): Date {
    if (!date) {
      return undefined;
    }
    const date2 = new Date(date);
    const timezoneOffset = 60 * 1000 * new Date().getTimezoneOffset();
    const ret = date2.getTime() - timezoneOffset;

    return new Date(ret);
  }
}
