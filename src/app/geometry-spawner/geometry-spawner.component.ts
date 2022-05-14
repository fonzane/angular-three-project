import { NgtRenderState, NgtStore } from '@angular-three/core';
import { NgtMesh } from '@angular-three/core/meshes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { Euler, Mesh, MeshStandardMaterial, RingGeometry } from 'three';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-geometry-spawner',
  templateUrl: './geometry-spawner.component.html',
  styleUrls: ['./geometry-spawner.component.scss']
})
export class GeometrySpawnerComponent implements OnInit {
  @ViewChild('mesh')mesh?: Mesh

  rings: Mesh[] = [];
  xRotationSpeed = 0.025;

  constructor(
    private store: NgtStore,
    private geometryService: GeometryService
  ) { }

  ngOnInit(): void {
    console.log(Euler);
  }

  async onMeshReady(mesh: Mesh) {
    let scene = this.store.get(s => s.scene);
    this.rings.push(mesh);

    interval(150).subscribe(() => {
      let clone = mesh.clone();
      clone.position.z = 0;
      clone.material = new MeshStandardMaterial({color: this.geometryService.getRandomColor()});
      clone.rotation.set(0, 0, Math.random()*Math.PI*2);
      scene.add(clone);
      this.rings.push(clone);
    })
    interval(1500).subscribe(() => this.xRotationSpeed = Math.random() > 0.5 ? -Math.random()*0.025 : Math.random()*0.025);
  }

  async onMeshBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    // let clonedRing = $event.object.clone();
    // clonedRing.position.z = -20;
    // clonedRing.material = new MeshStandardMaterial({color: this.geometryService.getRandomColor()});

    this.rings.forEach(r => {
      r.position.z += 0.005;
      r.rotation.z += this.xRotationSpeed;
    })

    // $event.state.scene.add(clonedRing);
    // this.rings.push(clonedRing);
  }

}
