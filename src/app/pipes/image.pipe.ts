import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return environment.ApiUrl + "api/Annonce/image/" + value;
  }

}
