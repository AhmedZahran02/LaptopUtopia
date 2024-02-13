import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ObjectToFormdataService {

  constructor() { }

  public convertToFormData(object) {
    let keys = Object.keys(object);
    let values: any = Object.values(object);

    let ret = new FormData();

    for (let i = 0; i < keys.length; i++) {
      ret.append(keys[i], values[i]);
    }

    return ret;
  }

  public ArrayConverter(object) {
    let keys = Object.keys(object);
    let values: any = Object.values(object);
    let ret = new FormData();

    for (let i = 0; i < keys.length; i++) {
      let str = keys[i] + "[]";
      for (let j = 0; j < values[i].length; j++)
      {
        ret.append(str, values[i][j]);
      }
      console.log(str + "=>" + ret.getAll(str));
    }

    

    return ret;
  }

}
