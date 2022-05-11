import { NgtCanvas, NgtRenderState } from '@angular-three/core';
import { NgtMesh } from '@angular-three/core/meshes';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { interval, timer } from 'rxjs';
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

  constructor(private geometryService: GeometryService) { }

  ngOnInit(): void {
  }

  onCubeReady(cube: Mesh) {
  }

  onCubeBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    let cube = $event.object;
    let scene = $event.state.scene;
    if(!this.runOnce) this.spawnCubes(cube, $event.state);
    this.runOnce = true;
    scene.remove(cube);

    this.cubes.forEach(cube => {
      cube.position.z -= 0.04
      if (cube.position.z < -50) scene.remove(cube);
    });
  }

  spawnCubes(cube: Mesh, state: NgtRenderState) {
    let scene = state.scene;
    interval(250).subscribe(() => {
      let randomPosition = [
        Math.random() > 0.5 ? -Math.random()*9 : Math.random()*4.5,
        Math.random() > 0.5 ? -Math.random()*8 : Math.random()*4,
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
