import { NgtEvent, NgtObjectInputs, NgtRenderState, NgtVector3 } from '@angular-three/core';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BufferGeometry, Color, Material, Mesh, MeshStandardMaterial } from 'three';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CubeComponent implements OnInit {
  @Input('position') position?: NgtVector3;
  hovered = false;
  active = false;
  moveForward: boolean = true;

  constructor(private geometryService: GeometryService) { }

  ngOnInit(): void {
  }

  onHover(hover: boolean, event: NgtEvent<PointerEvent>) {
    if (hover) {
      let cube = event.object as Mesh;
      let material = cube.material as MeshStandardMaterial;
      material.color = this.geometryService.getRandomColor();
    }
    this.hovered = hover;
  }

  onCubeBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    const cube = $event.object;
    const material = cube.material as MeshStandardMaterial;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
    this.geometryService.sphereColorChange.subscribe(() => {
      material.color = this.geometryService.getRandomColor()
    })
    // this.moveCube(cube);
  }

  onCubeReady(cube: Mesh<BufferGeometry, Material | Material[]>) {
    
  }

  moveCube(cube: Mesh) {
    let {x,y} = cube.position;
    if ((x === 0 && y >= 1 && y <= 6.5) && this.moveForward) cube.position.y += 0.025;
    if ((x === 0 && y >= 1 && y <= 6.5) && !this.moveForward) cube.position.y -= 0.025;
    if ((x === 0 && y <= -1 && y >= -6.5) && this.moveForward) cube.position.y -= 0.025;
    if ((x === 0 && y <= -1 && y >= -6.5) && !this.moveForward) cube.position.y += 0.025;
  }

}
