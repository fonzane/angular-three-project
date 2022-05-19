import { NgtRenderState, NgtStore } from '@angular-three/core';
import { NgtSobaOrbitControls, NgtSobaTransformControls } from '@angular-three/soba/controls';
import { Component, OnInit } from '@angular/core';
import { MathUtils, Mesh, MeshStandardMaterial, SphereGeometry } from 'three';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  stars: Mesh[] = [];

  constructor(
    private store: NgtStore
  ) { }

  ngOnInit(): void {
  }

  onMeshReady(mesh: Mesh) {
    for (let i = 0; i <= 2000; i++) {
      let star = this.createStar();
      this.store.get(s => s.scene).add(star);
      this.stars.push(star);
    }
    console.log(this.stars);
  }

  onMeshBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    let camera = $event.state.camera;
    // camera.position.z -= 0.01;
    camera.rotation.y += 0.0025;
  }

  createStar() {
    let star = new Mesh(
      new SphereGeometry(0.2, 24, 24),
      new MeshStandardMaterial({color: 0xffffff})
    );

    const [x,y,z] = new Array(3).fill(0).map(() => MathUtils.randFloatSpread(250));
    star.position.set(x,y,z);
    return star;
  }

}
