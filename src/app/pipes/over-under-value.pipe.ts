import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overUnderValue'
})
export class OverUnderValuePipe implements PipeTransform {

  transform(total: number, projAwayScore: number, projHomeScore: number, ou: 'over' | 'under') {
    const projTotal = projAwayScore + projHomeScore;

    if (ou === 'over') {
      return projTotal - total >= 4;
    } else {
      return total - projTotal >= 4;
    }
  }

}
