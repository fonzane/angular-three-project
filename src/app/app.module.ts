import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgtCanvasModule } from '@angular-three/core';
import { NgtMeshModule } from '@angular-three/core/meshes';
import { NgtBoxGeometryModule, NgtCircleGeometryModule, NgtSphereGeometryModule } from '@angular-three/core/geometries';
import { NgtMeshBasicMaterialModule, NgtMeshStandardMaterialModule } from '@angular-three/core/materials';
import { NgtAmbientLightModule, NgtSpotLightModule, NgtPointLightModule } from '@angular-three/core/lights';
import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { SphereComponent } from './sphere/sphere.component';
import { CubeSpawnerComponent } from './cube-spawner/cube-spawner.component';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    SphereComponent,
    CubeSpawnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgtCanvasModule,
    NgtMeshModule,
    NgtBoxGeometryModule,
    NgtCircleGeometryModule,
    NgtSphereGeometryModule,
    NgtMeshStandardMaterialModule,
    NgtAmbientLightModule,
    NgtSpotLightModule,
    NgtPointLightModule,
    NgtSobaOrbitControlsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
