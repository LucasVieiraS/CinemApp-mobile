import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieData'
})
export class MovieDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
