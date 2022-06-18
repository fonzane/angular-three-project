import { NgtCameraOptions, NgtCanvas, NgtRenderState, NgtStore } from '@angular-three/core';
import { NgtMesh } from '@angular-three/core/meshes';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom, interval, timer } from 'rxjs';
import { Group, MathUtils, Mesh, MeshStandardMaterial, Scene } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GeometryService } from '../geometry.service';

interface Xwing extends Group {
  moveSpeed?: number;
}

@Component({
  selector: 'app-cube-spawner',
  templateUrl: './cube-spawner.component.html',
  styleUrls: ['./cube-spawner.component.scss']
})
export class CubeSpawnerComponent implements OnInit {
  @ViewChild("cube") cube?: NgtMesh;
  @Input('canvas') canvas?: NgtCanvas;

  xwings: Xwing[] = [];
  runOnce = false;
  loader: GLTFLoader = new GLTFLoader();
  xwing?: Xwing;

  constructor(
    private geometryService: GeometryService,
    private store: NgtStore
  ) { }

  ngOnInit(): void {
  }

  async onMeshReady(cube: Mesh) {
    const scene = await firstValueFrom(this.store.scene$);
    this.loader.load('assets/x-wing/scene.gltf', (gltf: GLTF) => {
      this.xwing = gltf.scene;
      console.log(this.xwing);
      this.spawnObjects(this.xwing, scene);
    });
    const camera = await firstValueFrom(this.store.camera$);
    camera.far = 10000;
  }

  onMeshBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    let scene = $event.state.scene;
    this.xwings.forEach(xwing => {
      xwing.position.z -= xwing.moveSpeed!;
      if (xwing.position.z < -3500) {
        scene.remove(xwing);
        this.xwings.splice(this.xwings.indexOf(xwing), 1);
      }
    });
    console.log(this.xwings.length);
  }

  spawnObjects(xwing: Xwing, scene: Scene) {
    interval(300).subscribe(() => {
      let randomPosition = [
        Math.random() > 0.5 ? -Math.random()*1000 : Math.random()*1000,
        Math.random() > 0.5 ? -Math.random()*600 : Math.random()*600,
        0
      ]
      if (xwing) {
        let clonedXwing = xwing.clone();
        clonedXwing.position.set(randomPosition[0], randomPosition[1], randomPosition[2]);
        clonedXwing.lookAt(0, 0, -10000);
        clonedXwing.moveSpeed = MathUtils.randFloat(4, 10);

        scene.add(clonedXwing);
        this.xwings.push(clonedXwing);
      }
    })
  }

}
