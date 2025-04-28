import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],  // Declare HomeComponent
  imports: [
    CommonModule,
    HomeRoutingModule,  // Import HomeRoutingModule here
    SidebarComponent,
    HttpClientModule,  // Import HttpClientModule
    RouterModule
  ]
})
export class HomeModule { }