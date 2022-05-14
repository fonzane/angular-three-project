import { NgtCameraOptions, NgtRenderState, NgtState } from '@angular-three/core';
import { Component, Input } from '@angular/core';
import { Mesh, PerspectiveCamera } from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  onCanvasCreated(state: NgtState) {
    
  }

}
