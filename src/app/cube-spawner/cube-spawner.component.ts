import { NgtCanvas, NgtRenderState, NgtStore } from '@angular-three/core';
import { NgtMesh } from '@angular-three/core/meshes';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom, interval, timer } from 'rxjs';
import { Mesh, MeshStandardMaterial, Scene } from 'three';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-cube-spawner',
  templateUrl: './cube-spawner.component.html',
  styleUrls: ['./cube-spawner.component.scss']
})
export class CubeSpawnerComponent implements OnInit {
  @ViewChild("cube") cube?: NgtMesh;
  @Input('canvas') canvas?: NgtCanvas;

  cubes: Mesh[] = [];
  runOnce = false;

  constructor(
    private geometryService: GeometryService,
    private store: NgtStore
  ) { }

  ngOnInit(): void {
  }

  async onCubeReady(cube: Mesh) {
    this.cubes.push(cube);
    const scene = await firstValueFrom(this.store.scene$);
    this.spawnCubes(cube, scene);
  }

  onCubeBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    let scene = $event.state.scene;
    this.cubes.forEach(cube => {
      cube.position.z -= 0.05
      if (cube.position.z < -100) scene.remove(cube) && this.cubes.shift();
    });
  }

  spawnCubes(cube: Mesh, scene: Scene) {
    interval(100).subscribe(() => {
      let randomPosition = [
        Math.random() > 0.5 ? -Math.random()*9 : Math.random()*10,
        Math.random() > 0.5 ? -Math.random()*8 : Math.random()*6,
        5
      ]
      const clonedCube = cube.clone();
      clonedCube.position.set(randomPosition[0], randomPosition[1], randomPosition[2]);
      clonedCube.material = new MeshStandardMaterial({color: this.geometryService.getRandomColor()});

      scene.add(clonedCube);
      this.cubes.push(clonedCube);
    })
  }

}
