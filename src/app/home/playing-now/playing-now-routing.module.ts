import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayingNowComponent } from './playing-now.component';

const routes: Routes = [{
  path:'playing-now', component:PlayingNowComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayingNowRoutingModule { }
