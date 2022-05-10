import { NgtEvent, NgtRenderState, NgtVector3 } from '@angular-three/core';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BufferGeometry, Color, ColorRepresentation, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-sphere',
  templateUrl: './sphere.component.html',
  styleUrls: ['./sphere.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SphereComponent implements OnInit {
  @Input('position') position?: NgtVector3;
  scale: number = 0.5;
  moveForward: boolean = true;

  constructor(private geometryService: GeometryService) { }

  ngOnInit(): void {
  }
  
  onSphereReady(sphere: Mesh) {
    this.position = [0, 0, -2.5];
  }

  onMaterialReady(material: MeshStandardMaterial) {
    // let source = interval(1000);
    // source.subscribe(() => {
    //   material.color = this.getRandomColor(material);
    // })
  }

  onHover($event: NgtEvent<PointerEvent>) {
    let num = Number( "0x" +  Math.round(Math.random() * 0xffffff).toString(16));
    let circle = $event.object as Mesh;
    let material = circle.material as MeshStandardMaterial;
    material.color = new Color(num);
  }

  onSphereBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    let circle = $event.object;
    let material = circle.material as MeshStandardMaterial;
    
    if (this.moveForward) circle.position.z += 0.05;
    if (!this.moveForward) circle.position.z -= 0.05;

    if (circle.position.z < -2.5) {
      material.color = this.geometryService.getRandomColor();
      this.geometryService.sphereColorChange.next();
      this.moveForward = true
    };
    if (circle.position.z > 2.5) {
      material.color = this.geometryService.getRandomColor();
      this.geometryService.sphereColorChange.next();
      this.moveForward = false
    };
  }
}
