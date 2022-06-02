import { NgtRenderState, NgtStore } from '@angular-three/core';
import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { Group, Mesh } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-x-wing',
  templateUrl: './x-wing.component.html',
  styleUrls: ['./x-wing.component.scss']
})
export class XWingComponent {

  loader: GLTFLoader = new GLTFLoader();
  xwing?: Group;
  xwingRotateSpeedZ = 0.015;
  xwingMoveSpeedZ = -0.7;
  xwingLookAtZ = -10000;

  constructor(
    private store: NgtStore,
  ) { }

  onMeshReady(mesh: Mesh) {
    let scene = this.store.get(s => s.scene);

    this.loader.load('assets/x-wing/scene.gltf', (gltf: GLTF) => {
      this.xwing = gltf.scene;
    }, undefined, (err) => console.log(err));

    timer(1000).subscribe(() => {
      if(this.xwing) {
        this.xwing.position.z = -150;
        this.xwing.lookAt(0, 0, this.xwingLookAtZ);
        scene.add(this.xwing);
      }
    })

    interval(7000).subscribe(() => {
      this.xwingLookAtZ = -this.xwingLookAtZ;
      this.xwingMoveSpeedZ = -this.xwingMoveSpeedZ;

      if (this.xwing) {
        this.xwing.lookAt(0,0,this.xwingLookAtZ);
      }
    })
  }

  async onMeshBeforeRender($event: {state: NgtRenderState, object: Mesh}) {

    if(this.xwing) {
      this.xwing.position.z += this.xwingMoveSpeedZ;
      // this.xwing.rotation.z += this.xwingRotateSpeedZ;
    }

  }

}
