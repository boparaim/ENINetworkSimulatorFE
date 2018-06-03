import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GraphComponent } from './graph/graph.component';
import { AddNodeComponent } from './add-node/add-node.component';
import { AddEdgeComponent } from './add-edge/add-edge.component';
import { SettingsComponent } from './settings/settings.component'

/*import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';*/

const routes: Routes = [
  // default route
  { path: '', redirectTo: '/graph', pathMatch: 'full' },
  { path: 'graph', component: GraphComponent },
  { path: 'add-node', component: AddNodeComponent },
  { path: 'add-edge', component: AddEdgeComponent },
  { path: 'settings', component: SettingsComponent }
  /*{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

// routing module doesn't need component
//import { CommonModule } from '@angular/common';
//@NgModule({
//  imports: [
//    CommonModule
//  ],
//  declarations: []
//})
export class AppRoutingModule { }
