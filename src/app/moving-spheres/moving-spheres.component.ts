import { NgtRenderState, NgtStore } from '@angular-three/core';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';
import { Mesh, Vector3 } from 'three';
import { CustomSphere } from './custom-sphere.class';

@Component({
  selector: 'app-moving-spheres',
  templateUrl: './moving-spheres.component.html',
  styleUrls: ['./moving-spheres.component.scss']
})
export class MovingSpheresComponent {

  // xMoveSpeed = 0.01;
  // yMoveSpeed = 0.01;

  sphereCloned = false;

  spheres: CustomSphere[] = [];

  constructor(private store: NgtStore) { }

  onSphereReady(sphere: CustomSphere) {
    sphere.moveUpward = true;
    sphere.increaseYSpeed = true;
    sphere.xMoveSpeed = 0.01;
    sphere.yMoveSpeed = 0.01;

    this.spheres.push(sphere);
  }

  onMeshBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    let sphere = $event.object as CustomSphere;

    this.spheres.forEach(s => {
      // moving the sphere
      s.position.x += 0.01;
      if (s.moveUpward) s.position.y += s.yMoveSpeed!;
      if (!s.moveUpward) s.position.y -= s.yMoveSpeed!;
      
      if (s.position.y >= 2.5) {
        s.moveUpward = false;
        s.increaseYSpeed = true;
        s.yMoveSpeed = 0.01;
      };
      if (s.position.y <= -2.5) {
        s.moveUpward = true;
        s.increaseYSpeed = true;
        s.yMoveSpeed = 0.01;
      };
  
      // setting spheres movementspeed
      if (s.increaseYSpeed) s.yMoveSpeed! += 0.0005;
      if (!s.increaseYSpeed) s.yMoveSpeed! -= 0.005;
    })

    if (sphere.position.y >= 2.5) this.cloneSphere(sphere);
    if (sphere.position.y <= -2.5) this.cloneSphere(sphere);

  }

  async cloneSphere(sphere: CustomSphere) {
    if (!this.sphereCloned) {
      let clonedSphere = sphere.clone();

      clonedSphere.moveUpward = true;
      clonedSphere.increaseYSpeed = true;
      sphere.xMoveSpeed = 0.01;
      sphere.yMoveSpeed = 0.01;
      clonedSphere.position.set(-3, 0, 0);
  
      let scene = await firstValueFrom(this.store.scene$);
      scene.add(clonedSphere);
      this.spheres.push(clonedSphere);
    }

    this.sphereCloned = true;
    timer(500).subscribe(() => this.sphereCloned = false);
  }

}
