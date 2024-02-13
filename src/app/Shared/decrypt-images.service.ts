import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecryptImagesService {

  constructor() { }

  getImagesArray(imageurls): Array<string> {
    let ArrImages = [];
    let i = 0;

    while (imageurls.length > 0) {
      let x = imageurls.indexOf('$')
      if (x == -1) {
        ArrImages.push(imageurls);
        break;
      }
      else {
        ArrImages.push(imageurls.substring(0, x));
        imageurls = imageurls.slice(x + 1, imageurls.length);
      }
    }

    return ArrImages;
  }

}
