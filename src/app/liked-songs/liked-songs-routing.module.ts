import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikedSongsComponent } from './liked-songs.component';

const routes: Routes = [{
  path:'liked-songs', component:LikedSongsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LikedSongsRoutingModule { }
