import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/app/interfaces/Joueur';
import { JoueurService } from 'src/app/services/joueur.service';
import { ClassementService } from 'src/app/services/classement.service';
import { Classement } from 'src/app/interfaces/Classement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieAge } from 'src/app/interfaces/CategorieAge';
import { CategorieAgeService } from 'src/app/services/categorie-age.service';

@Component({
  selector: 'app-joueur-admin',
  templateUrl: './joueur-admin.component.html',
  styleUrls: ['./joueur-admin.component.css']
})
export class JoueurAdminComponent implements OnInit {

  listeJoueurs : Joueur[] = [];
  listeClassementsHommes : Classement[] = [];
  listeClassementsDames : Classement[] = [];
  listeCategoriesAges : CategorieAge[] = [];
  formGroup : FormGroup = this._formBuild.group({});

  isShown : boolean = false;
  selectedGenre : string = "";

  constructor(private _jService : JoueurService, private _cService : ClassementService, private _formBuild : FormBuilder, private _ageService : CategorieAgeService) { }

  ngOnInit(): void {

    this.chargerListeJoueurs();
    this.chargerListesClassements();
    this.chargerlisteCategorieAge();
  }

  chargerListeJoueurs() {
    this._jService.GetAll().subscribe(
      (listFromApi : Joueur[]) => {
        this.listeJoueurs = listFromApi;
      }
    );
  }

  chargerListesClassements() {
    this._cService.GetAll().subscribe(
      (listFromApi : Classement[]) => {
        for (let classement of listFromApi) {
          if (classement.denomination[0] != "E") {
            this.listeClassementsDames.push(classement);
          }
          this.listeClassementsHommes.push(classement);
        }
      }
    )
  }

  chargerlisteCategorieAge() {
    this._ageService.GetAll().subscribe(
      (listFromApi : CategorieAge[]) => {
        this.listeCategoriesAges = listFromApi;
      }
    )
  }

  activerForm() {
    this.formGroup = this._formBuild.group({
      nom : ["test", [Validators.required]],
      prenom : ["test", [Validators.required]],
      classementHommes : ["", /*[Validators.required]*/],
      classementDames : [""],
      categorieAge : ["", /*[Validators.required]*/],
      genre : ["", /*[Validators.required]*/],
    }, Validators.required);
    this.isShown = true;
    console.log(this.formGroup.valid);
    console.log(this.formGroup.controls);
  }

  submit() {
    console.log(this.formGroup.valid);
  }

}
