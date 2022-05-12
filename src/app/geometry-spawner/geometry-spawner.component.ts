import { NgtRenderState, NgtStore } from '@angular-three/core';
import { NgtMesh } from '@angular-three/core/meshes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Mesh, MeshStandardMaterial, RingGeometry } from 'three';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-geometry-spawner',
  templateUrl: './geometry-spawner.component.html',
  styleUrls: ['./geometry-spawner.component.scss']
})
export class GeometrySpawnerComponent implements OnInit {
  @ViewChild('mesh')mesh?: Mesh

  rings: Mesh[] = [];

  constructor(
    private store: NgtStore,
    private geometryService: GeometryService
  ) { }

  ngOnInit(): void {
  }

  async onMeshReady(mesh: Mesh) {
    this.rings.push(mesh);
  }

  async onMeshBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    let clonedRing = $event.object.clone();
    clonedRing.position.z = -50;
    clonedRing.material = new MeshStandardMaterial({color: this.geometryService.getRandomColor()});

    this.rings.forEach(r => {
      r.position.z += 0.05;
    })

    $event.state.scene.add(clonedRing);
    this.rings.push(clonedRing);
  }

}
