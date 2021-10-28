import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoueurAdminComponent } from './components/joueur-admin/joueur-admin.component';
import { AnnonceAdminComponent } from './components/annonce-admin/annonce-admin.component';
import { StageAdminComponent } from './components/stage-admin/stage-admin.component';
import { ClassementAdminComponent } from './components/classement-admin/classement-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MenubarModule} from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table'
import {CascadeSelectModule} from 'primeng/cascadeselect'
import { DropdownModule } from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { EnvPipe } from './pipes/env.pipe';
import { ImagePipe } from './pipes/image.pipe';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    AppComponent,
    JoueurAdminComponent,
    AnnonceAdminComponent,
    StageAdminComponent,
    ClassementAdminComponent,
    EnvPipe,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    CascadeSelectModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    TagModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
