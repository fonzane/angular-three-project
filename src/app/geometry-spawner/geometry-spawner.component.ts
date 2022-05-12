import { NgtStore } from '@angular-three/core';
import { NgtSphereGeometry } from '@angular-three/core/geometries';
import { NgtMesh } from '@angular-three/core/meshes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, SphereGeometry } from 'three';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-geometry-spawner',
  templateUrl: './geometry-spawner.component.html',
  styleUrls: ['./geometry-spawner.component.scss']
})
export class GeometrySpawnerComponent implements OnInit {
  @ViewChild('mesh')mesh?: Mesh

  constructor(
    private store: NgtStore,
    private geometryService: GeometryService
  ) { }

  ngOnInit(): void {
  }

  async onMeshReady(mesh: NgtMesh) {
    mesh.geometry = new SphereGeometry();
    mesh.material = new MeshStandardMaterial({color: this.geometryService.getRandomColor()});
  }

}
