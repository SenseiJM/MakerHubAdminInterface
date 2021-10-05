import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/app/classes/Joueur';
import { JoueurService } from 'src/app/services/joueur.service';
import { ClassementService } from 'src/app/services/classement.service';
import { Classement } from 'src/app/classes/Classement';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CategorieAge } from 'src/app/classes/CategorieAge';
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
  formGroup! : FormGroup;

  isShown : boolean = false;
  selectedGenre : string = "";

  constructor(private _jService : JoueurService, private _cService : ClassementService, private _ageService : CategorieAgeService) { }

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
      nom : new FormControl("", [Validators.required]),
      prenom : new FormControl("", [Validators.required]),
      classementHommes : new FormControl("", [Validators.required]),
      classementDames : new FormControl(""),
      categorieAge : new FormControl("", [Validators.required]),
      genre : new FormControl ("", [Validators.required])
    });
    this.isShown = true;
  }

  submit() {

    let nouvJoueur = new Joueur();

    nouvJoueur.nom = this.formGroup.value["nom"];
    nouvJoueur.prenom = this.formGroup.value["prenom"];
    nouvJoueur.idClassementHommes = this.formGroup.value["classementHommes"];
    nouvJoueur.idClassementDames = this.formGroup.value["classementDames"];
    nouvJoueur.idCategorieAge = this.formGroup.value["categorieAge"];
    nouvJoueur.genre = this.formGroup.value["genre"];

    console.log(nouvJoueur);
    this._jService.AddJoueur(nouvJoueur).subscribe();
  }

  //Debug purposes only
  afficherListeJoueurs() {
    console.log(this.listeJoueurs);
  }

  changeEvent($event: any) {
    console.log($event.target.value);
    console.log(typeof $event.target.value);
    if ($event.target.value === "Dame") {
      this.formGroup.controls["classementDames"].enable();
    } else {
      this.formGroup.controls["classementDames"].disable();

    }
  }

  deleteJoueur(id : number) {
    this._jService.Delete(id).subscribe();
  }

}
