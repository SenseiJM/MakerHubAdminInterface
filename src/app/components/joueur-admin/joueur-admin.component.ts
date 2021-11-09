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
import { Member } from 'src/app/interfaces/member';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-joueur-admin',
  templateUrl: './joueur-admin.component.html',
  styleUrls: ['./joueur-admin.component.css']
})
export class JoueurAdminComponent implements OnInit {

  listeJoueurs : Member[] = [];

  constructor(private _clubService : ClubService) { }

  ngOnInit(): void {

    this.chargerListeJoueurs();
  }

  chargerListeJoueurs() {
    this._clubService.GetClubMembers().subscribe(
      (listFromApi : Member[]) => {
        this.listeJoueurs = listFromApi;
      }
    )
    
  }

}
