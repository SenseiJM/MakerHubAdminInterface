import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/app/classes/Joueur';
import { JoueurService } from 'src/app/services/joueur.service';
import { ClassementService } from 'src/app/services/classement.service';
import { Classement } from 'src/app/classes/Classement';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CategorieAge } from 'src/app/classes/CategorieAge';
import { CategorieAgeService } from 'src/app/services/categorie-age.service';
import { Router } from '@angular/router';

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
  formGroup! : FormGroup;

  isShown : boolean = false;
  selectedGenre : string = "";

  constructor(private _jService : JoueurService, private _cService : ClassementService, private _ageService : CategorieAgeService, private _router : Router) { }

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

    this.formGroup = new FormGroup({
      nom : new FormControl(null, [Validators.required]),
      prenom : new FormControl(null, [Validators.required]),
      idClassementHommes : new FormControl(null, [Validators.required]),
      idClassementDames : new FormControl(null),
      idCategorieAge : new FormControl(null, [Validators.required]),
      genre : new FormControl (null, [Validators.required])
    });

    this.formGroup.get('genre')?.valueChanges.subscribe(() => this.changeEvent());
    this.isShown = true;
  }

  submit() {

    // let nouvJoueur = new Joueur();

    // nouvJoueur.nom = this.formGroup.value["nom"];
    // nouvJoueur.prenom = this.formGroup.value["prenom"];
    // nouvJoueur.idClassementHommes = this.formGroup.value["idClassementHommes"];
    // nouvJoueur.idClassementDames = this.formGroup.value["idClassementDames"];
    // nouvJoueur.idCategorieAge = this.formGroup.value["idCategorieAge"];
    // nouvJoueur.genre = this.formGroup.value["genre"];

    //console.log(nouvJoueur);
    this._jService.AddJoueur(this.formGroup.value).subscribe(
      () => {
        this.chargerListeJoueurs();
      }
    );
    // this._router.navigate(['joueur-admin']);
    // this.listeJoueurs = [];
    this.isShown = false;
  }

  //Debug purposes only
  afficherListeJoueurs() {
    console.log(this.listeJoueurs);
  }

  changeEvent() {
    console.log(42);
    
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

}
