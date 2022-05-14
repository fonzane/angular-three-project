import { NgtRenderState, NgtStore } from '@angular-three/core';
import { Component } from '@angular/core';
import { firstValueFrom, interval, timer } from 'rxjs';
import { Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { GeometryService } from '../geometry.service';
import { CustomSphere } from './custom-sphere.class';

@Component({
  selector: 'app-moving-spheres',
  templateUrl: './moving-spheres.component.html',
  styleUrls: ['./moving-spheres.component.scss']
})
export class MovingSpheresComponent {

  sphereDimension = 10;

  sphereCloned = false;
  spheres: CustomSphere[] = [];
  sphereRowCount = this.sphereDimension;
  sphereColCount = this.sphereDimension;
  sphereHeightCount = this.sphereDimension;

  constructor(
    private store: NgtStore,
    private geometryService: GeometryService
  ) { }

  async onSphereReady(sphere: CustomSphere) {
    let scene = await firstValueFrom(this.store.scene$);
    let camera = await firstValueFrom(this.store.camera$);
    
    for (let row = 0; row <= this.sphereRowCount; row++) {
      for (let col = 0; col <= this.sphereColCount; col++) {
        for (let hi = 0; hi <= this.sphereHeightCount; hi++) {
          let clone = sphere.clone();
          clone.position.set(col*3, hi*3, -row*3);
          timer((100*row+150)+(100*col+150)+(100*hi+150)).subscribe(() => {
            (clone.material as MeshStandardMaterial).color = this.geometryService.getRandomColor();
            scene.add(clone)
          });
          this.spheres.push(clone);
        }
      }
    }
    sphere.visible = false;
    
    // camera.position.set(15, 15, -15);
    camera.position.set(30,30,30);
  }

  onMeshBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    let sphere = $event.object as CustomSphere;
    let camera = this.store.get(s => s.camera);

    // if (sphere.position.y >= 2.5) this.cloneSphere(sphere);
    // if (sphere.position.y <= -2.5) this.cloneSphere(sphere);

    camera.lookAt(15, 15, -15);
    console.log(camera.position);
  }

  async cloneSphere(sphere: CustomSphere) {
    if (!this.sphereCloned) {
      let scene = await firstValueFrom(this.store.scene$);
      let clonedSphere = sphere.clone();

      clonedSphere = this.setSphereInitialValues(clonedSphere);
      clonedSphere.position.set(-3, -2.5, 0);
  
      scene.add(clonedSphere);
      this.spheres.push(clonedSphere);
    }

    this.sphereCloned = true;
    timer(500).subscribe(() => this.sphereCloned = false);
  }

  setSphereInitialValues(sphere: CustomSphere) {
    sphere.moveUpward = true;
    sphere.increaseYSpeed = true;
    sphere.xMoveSpeed = 0.01;
    sphere.yMoveSpeed = 0.01;
    return sphere;
  }

  moveSphere(s: CustomSphere) {
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
  }

}
