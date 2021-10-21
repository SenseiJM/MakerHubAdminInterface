import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/app/interfaces/Joueur';
import { JoueurService } from 'src/app/services/joueur.service';
import { ClassementService } from 'src/app/services/classement.service';
import { Classement } from 'src/app/interfaces/Classement';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieAge } from 'src/app/interfaces/CategorieAge';
import { CategorieAgeService } from 'src/app/services/categorie-age.service';
import { Router } from '@angular/router';
import { GenreEnum } from 'src/app/enums/genre';

@Component({
  selector: 'app-joueur-admin',
  templateUrl: './joueur-admin.component.html',
  styleUrls: ['./joueur-admin.component.css']
})
export class JoueurAdminComponent implements OnInit {

  private _listeJoueurs : Joueur[] = [];
  displayAddModal : boolean = false;
  genres : string[] = Object.keys(GenreEnum);
  displayEditModal : boolean = false;
  joueurModifie! : Joueur;

  get listeJoueurs() : Joueur[] {
    return this._listeJoueurs.filter(j => j.nom.toLowerCase().includes(this.stringRecherche.toLowerCase()) || j.prenom.toLowerCase().includes(this.stringRecherche.toLowerCase()));
  }

  set listeJoueurs(v) {
    this._listeJoueurs = v;
  }

  listeClassementsHommes : Classement[] = [];
  listeClassementsDames : Classement[] = [];
  listeCategoriesAges : CategorieAge[] = [];
  formGroup! : FormGroup;

  isShown : boolean = false;
  selectedGenre : string = "";

  stringRecherche : string = "";
  styleAffichageJoueur : string = "flex";
  listeJoueursRecherche : Joueur[] = [];
  styleAffichageRecherche : string = "none";  

  constructor(private _jService : JoueurService, private _cService : ClassementService, private _ageService : CategorieAgeService, private _router : Router, private _formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.chargerListeJoueurs();
    this.chargerListesClassements();
    this.chargerlisteCategorieAge();
    //NGRX et NGXS State Manager
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

  addJoueur() {
    this.displayAddModal = true;
    this.formGroup = this._formBuilder.group({
      nom : [null, [Validators.required]],
      prenom : [null, [Validators.required]],
      idClassementHommes : [null, [Validators.required]],
      idClassementDames : [null],
      idCategorieAge : [null, [Validators.required]],
      genre :  [null, [Validators.required]]
    });

    this.formGroup.get('genre')?.valueChanges.subscribe(() => this.changeEvent());
    this.isShown = true;
  }

  submit() {
    this._jService.AddJoueur(this.formGroup.value).subscribe(
      () => {
        this.chargerListeJoueurs();  
      }
    );
    this.isShown = false;
    this.displayAddModal = false;
  }

  changeEvent() {
    if (this.formGroup.get('genre')?.value === "Dame") {
      this.formGroup.controls["idClassementDames"].enable();
    } else {
      this.formGroup.controls["idClassementDames"].disable();
    }
    
  }

  deleteJoueur(id : number) {
    this._jService.Delete(id).subscribe(
      () => {
        this.chargerListeJoueurs();
      }
    );
  }

  showEditJoueur(id : number) {
    let modifJoueur : Joueur;
    this._jService.GetJoueurByID(id).subscribe(
      (joueurFromApi) => {
        this.joueurModifie = joueurFromApi;
        this.formGroup.patchValue(this.joueurModifie);
      }
    );
    this.displayEditModal = true;
    this.formGroup = this._formBuilder.group({
      id : [null],
      nom : [null, [Validators.required]],
      prenom : [null, [Validators.required]],
      idClassementHommes : [null, [Validators.required]],
      idClassementDames : [null],
      idCategorieAge : [null, [Validators.required]],
      genre :  [null, [Validators.required]]
    });

    this.formGroup.get('genre')?.valueChanges.subscribe(() => this.changeEvent());
    this.isShown = true;
  }

  confirmEditJoueur() {
    console.log("ICI");
    this._jService.Update(this.formGroup.value, this.joueurModifie.id).subscribe(
      () => {
        this.chargerListeJoueurs();
      }
    );
    this.isShown = false;
    this.displayEditModal = false;
  }

}
