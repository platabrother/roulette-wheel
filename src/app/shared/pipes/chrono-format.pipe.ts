import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chronoformat',
})
export class ChronoFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value) return '...';

    value = parseFloat(value.toString());

    let min: string = Math.floor(value / 60).toString();
    let sec: string = (value % 60).toString();

    if (+min < 10) min = `0${min}`;
    if (+sec < 10) min = `0${min}`;

    return `${min}:${sec}`;
  }
}
