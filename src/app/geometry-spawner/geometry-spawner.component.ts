import { NgtRenderState, NgtStore } from '@angular-three/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { interval, timer } from 'rxjs';
import { Euler, Group, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, RingGeometry } from 'three';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-geometry-spawner',
  templateUrl: './geometry-spawner.component.html',
  styleUrls: ['./geometry-spawner.component.scss']
})
export class GeometrySpawnerComponent implements OnInit {
  @ViewChild('mesh')mesh?: Mesh;
  @Input('blog-link')blogLink?: HTMLAnchorElement;

  rings: Mesh<RingGeometry, MeshStandardMaterial>[] = [];
  xRotationSpeed = 0.02;
  zMoveSpeed = 0.01;
  blogLinkMovX = 1;
  blogLinkMovY = 1;

  trollEmojis = ['🤣', '😂', '😜', '🤑', '😳', '👻', '🤡', '🖕'];

  constructor(
    private store: NgtStore,
    private geometryService: GeometryService
  ) { }

  ngOnInit(): void {
    console.log(Euler);
  }

  async onMeshReady(mesh: Mesh) {
    let scene = this.store.get(s => s.scene);
    this.rings.push(mesh as CustomRing);

    interval(200).subscribe(() => {
      let clone = new Mesh(
        new RingGeometry(Math.random()*0.5+0.025, Math.random()*0.5),
        new MeshStandardMaterial({color: this.geometryService.getRandomColor(), opacity: Math.random()*0.75+0.2, transparent: true})
      ) as CustomRing;
      clone.position.setZ(2);
      clone.rotation.set(0, 0, Math.random()*Math.PI*2);
      clone.rotationSpeed = Math.random() > 0.5 ? Math.random() * this.xRotationSpeed +0.005: -(Math.random()*this.xRotationSpeed+0.005);
      scene.add(clone);
      this.rings.push(clone);
    });
    // if(this.blogLink) {
    //   this.blogLink.style.right = "0px";
    //   this.blogLink.style.top = "0px";
    //   timer(1000).subscribe(() => {
    //     interval(4000).subscribe(() => {
    //       this.blogLink!.style.right = "0px";
    //       this.blogLink!.style.top = "0px";
    //       this.blogLink!.innerHTML = "Blog";
    //       this.blogLink!.style.boxShadow = "0 0 2px 2px white";
    //     })
    //   })
    //   interval(4000).subscribe(() => {
    //     this.blogLink!.style.top = MathUtils.randInt(0, window.innerHeight) + "px";
    //     this.blogLink!.style.right = MathUtils.randInt(0, window.innerWidth) + "px";
    //     this.blogLink!.innerHTML = this.trollEmojis[MathUtils.randInt(0, this.trollEmojis.length-1)];
    //     let boxShadow = `0 0 ${Math.random()*5+2}px ${Math.random()*5+2}px rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    //     this.blogLink!.style.boxShadow = boxShadow;
    //     console.log(this.blogLink?.style.boxShadow, boxShadow);
    //   });
    // };
  }

  async onMeshBeforeRender($event: {state: NgtRenderState, object: Mesh}) {
    // let clonedRing = $event.object.clone();
    // clonedRing.position.z = -20;
    // clonedRing.material = new MeshStandardMaterial({color: this.geometryService.getRandomColor()});

    this.rings.forEach((r: CustomRing) => {
      let scene = $event.state.scene;
      r.position.z += this.zMoveSpeed;
      r.rotation.z += r.rotationSpeed!
      

      if (r.position.z >= 5) {
        this.zMoveSpeed = 0.0035;
        scene.remove(r);
        this.rings.shift();
      }
    })
    if (this.blogLink) {
    }
  }
}

interface CustomRing extends Mesh<RingGeometry, MeshStandardMaterial> {
  rotationSpeed?: number;
}