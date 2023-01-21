import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAsLastX',
})
export class DateAsLastXPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): any {
    const currentTime = new Date();
    const msPerDay = 86400000;

    const msDifference = currentTime.getTime() - value.getTime();
    const minsDifference = msDifference / 1000 / 60;
    const daysDifference = msDifference / msPerDay;
    const hoursDifference = daysDifference * 24;
    const monthsDifference = daysDifference / 30.437;
    const yearsDifference = daysDifference / 365.25;

    if (daysDifference < 1) {
      let hoursAgo = Math.ceil(hoursDifference);
      if (hoursAgo <= 1) return `${Math.round(minsDifference)} minutes ago`;
      hoursAgo = Math.round(hoursDifference);
      return hoursAgo === 1 ? `${hoursAgo} hour ago` : `${hoursAgo} hours ago`;
    }
    if (1 < daysDifference && daysDifference < 2) return 'yesterday';
    if (daysDifference < 30) return `${Math.round(daysDifference)} days ago`;
    if (yearsDifference < 1) {
      const monthsAgo = Math.round(monthsDifference);
      return monthsAgo === 1
        ? `${monthsAgo} month ago`
        : `${monthsAgo} months ago`;
    }
    const yearsAgo = Math.round(yearsDifference);
    return yearsAgo === 1 ? `${yearsAgo} year ago` : `${yearsAgo} years ago`;
  }
}
