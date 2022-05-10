import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Color } from 'three';

@Injectable({
  providedIn: 'root'
})
export class GeometryService {
  public sphereColorChange: Subject<void> = new Subject();

  constructor() { }

  getRandomColor() {
    let num = Number( "0x" +  Math.round(Math.random() * 0xffffff).toString(16));
    return new Color( num );
  }
}
