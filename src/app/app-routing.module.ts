import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnonceAdminComponent } from './components/annonce-admin/annonce-admin.component';
import { JoueurAdminComponent } from './components/joueur-admin/joueur-admin.component';
import { SouperAdminComponent } from './components/souper-admin/souper-admin.component';
import { StageAdminComponent } from './components/stage-admin/stage-admin.component';

const routes: Routes = [
  {path: '', component: AnnonceAdminComponent},
  {path: 'joueur-admin', component: JoueurAdminComponent},
  {path: 'annonce-admin', component: AnnonceAdminComponent},
  {path: 'stage-admin', component: StageAdminComponent},
  {path: 'souper-admin', component: SouperAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
