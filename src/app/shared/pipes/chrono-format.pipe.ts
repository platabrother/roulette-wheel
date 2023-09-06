import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chronoformat',
})
export class ChronoFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value) return '...';

    value = parseFloat(value.toString());

    const min: number = Math.floor(value / 60);
    const sec: number = value % 60;

    return `${min}min ${sec}sec`;
  }
}
