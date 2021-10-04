import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { JoueurAdminComponent } from './components/joueur-admin/joueur-admin.component';
import { AnnonceAdminComponent } from './components/annonce-admin/annonce-admin.component';
import { StageAdminComponent } from './components/stage-admin/stage-admin.component';
import { ClassementAdminComponent } from './components/classement-admin/classement-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoueurAdminComponent,
    AnnonceAdminComponent,
    StageAdminComponent,
    ClassementAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
