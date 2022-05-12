import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgtCanvasModule } from '@angular-three/core';
import { NgtMeshModule } from '@angular-three/core/meshes';
import { 
  NgtBoxGeometryModule,
  NgtSphereGeometryModule,
  NgtRingGeometryModule,
  NgtTorusGeometryModule,
  NgtTubeGeometryModule,
  NgtCircleGeometryModule
} from '@angular-three/core/geometries';
import { NgtMeshStandardMaterialModule } from '@angular-three/core/materials';
import { NgtAmbientLightModule, NgtSpotLightModule, NgtPointLightModule } from '@angular-three/core/lights';
import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { SphereComponent } from './sphere/sphere.component';
import { CubeSpawnerComponent } from './cube-spawner/cube-spawner.component';
import { GeometrySpawnerComponent } from './geometry-spawner/geometry-spawner.component';
import { MovingSpheresComponent } from './moving-spheres/moving-spheres.component';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    SphereComponent,
    CubeSpawnerComponent,
    GeometrySpawnerComponent,
    MovingSpheresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgtCanvasModule,
    NgtMeshModule,
    NgtBoxGeometryModule,
    NgtSphereGeometryModule,
    NgtRingGeometryModule,
    NgtTorusGeometryModule,
    NgtTubeGeometryModule,
    NgtMeshStandardMaterialModule,
    NgtCircleGeometryModule,
    NgtAmbientLightModule,
    NgtSpotLightModule,
    NgtPointLightModule,
    NgtSobaOrbitControlsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
