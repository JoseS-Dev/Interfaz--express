import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 12, suffix = '...'): string {
    if (!value) return '';
    return value.length <= limit ? value : value.slice(0, limit) + suffix;
  }
}
