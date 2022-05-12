import { NgtRenderState, NgtStore } from '@angular-three/core';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Mesh, Vector3 } from 'three';
import { CustomSphere } from './custom-sphere.class';

@Component({
  selector: 'app-moving-spheres',
  templateUrl: './moving-spheres.component.html',
  styleUrls: ['./moving-spheres.component.scss']
})
export class MovingSpheresComponent {

  xMoveSpeed = 0.01;
  yMoveSpeed = 0.01;

  spheres: CustomSphere[] = [];

  constructor(private store: NgtStore) { }

  onSphereReady(sphere: CustomSphere) {
    sphere.moveUpward = true;
    sphere.increaseYSpeed = true;
    this.spheres.push(sphere);
  }

  onMeshBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    let sphere = $event.object;

    this.spheres.forEach(sphere => {
      // moving the sphere
      sphere.position.x += 0.01;
      if (sphere.moveUpward) sphere.position.y += this.yMoveSpeed;
      if (!sphere.moveUpward) sphere.position.y -= this.yMoveSpeed;
      
      if (sphere.position.y >= 2.5) {
        sphere.moveUpward = false;
        sphere.increaseYSpeed = true;
        this.yMoveSpeed = 0.01;
      };
      if (sphere.position.y <= -2.5) {
        sphere.moveUpward = true;
        sphere.increaseYSpeed = true;
        this.yMoveSpeed = 0.01;
      };
  
      // setting spheres movementspeed
      if (sphere.increaseYSpeed) this.yMoveSpeed += 0.0005;
      if (!sphere.increaseYSpeed) this.yMoveSpeed -= 0.005;
    })

  }

  async cloneSphere(sphere: CustomSphere) {
    let clonedSphere = sphere.clone();
    clonedSphere.position.set(-3, 0, 0);

    let scene = await firstValueFrom(this.store.scene$);
    scene.add(clonedSphere);
    this.spheres.push(clonedSphere);
  }

}
