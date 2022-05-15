import { NgtState } from '@angular-three/core';
import { Component, Input } from '@angular/core';
import { TextureLoader } from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  onCanvasCreated(state: NgtState) {
    let spaceTexture = new TextureLoader().load('../assets/jake-weirick-unsplash-space.jpg');
    state.scene.background = spaceTexture;
  }

}
