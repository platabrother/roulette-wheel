import { Pipe, PipeTransform } from '@angular/core';
import { Round } from '@interfaces/rounds/round.interface';

@Pipe({
  name: 'limitResult'
})
export class LimitResultPipe implements PipeTransform {
  transform(value: Round[] | null, limit: number): Round[] | null {
    if (value === null) {
      return null;
    }

    return value.slice(0, limit);
  }
}
