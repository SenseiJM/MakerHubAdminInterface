import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/interfaces/Annonce';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-annonce-admin',
  templateUrl: './annonce-admin.component.html',
  styleUrls: ['./annonce-admin.component.css']
})
export class AnnonceAdminComponent implements OnInit {

  listeAnnonces : Annonce[] = [];

  constructor(private _aService : AnnonceService) { }

  ngOnInit(): void {

    this.chargerListeAnnonces();

  }

  chargerListeAnnonces() {
    this._aService.GetAll().subscribe(
      (listFromApi : Annonce[]) => {
        this.listeAnnonces = listFromApi;
      }
    );
  }

}
