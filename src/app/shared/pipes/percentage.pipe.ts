/**
 * System Percentage Pipe
 * @export
 * @implements PipeTransform
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'populationPercent',
})
export class PercentagePipe implements PipeTransform {
  /**
   * Returns percentage Number
   * In case there's 0 or null or undefined as value returns '------'
   * @param  {*} value
   * @param  {...number} args
   * @return *
   */
  transform(value: number, population: number): string | number {
    //getting percentage of total population
    if (value == null) {
      return '------';
    } else {
      const percent = (value * 100) / population;
      if (value && !Math.trunc(percent)) return percent.toFixed(2);
      else return Math.round(percent);
    }
  }
}
