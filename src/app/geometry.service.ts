import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Color, RingGeometry, SphereGeometry, TorusGeometry } from 'three';

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

  getRandomGeometry() {
    let randomNum = Math.random();
    if (randomNum < 0.33) return new SphereGeometry();
    else if (randomNum < 0.66) return new TorusGeometry();
    else return new RingGeometry();
  }
}
