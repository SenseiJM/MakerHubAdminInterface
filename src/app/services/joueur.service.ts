import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Joueur } from '../interfaces/Joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  private url: string = environment.ApiUrl;

  constructor(private _client: HttpClient) { }

  AddJoueur(newJoueur : Joueur) : Observable<Joueur[]> {
    return this._client.post<Joueur[]>(this.url+"api/Joueur", newJoueur);
  }

  Update(modifiedJoueur : Joueur, id : number) : Observable<Joueur> {
    return this._client.put<Joueur>(this.url + "api/Joueur/" + id, modifiedJoueur);
  }

  GetJoueurByID(id : number) : Observable<Joueur> {
    return this._client.get<Joueur>(this.url + "api/Joueur/byID/" + id);
  }

  GetAll() : Observable<Joueur[]> {
    return this._client.get<Joueur[]>(this.url + "api/Joueur");
  }

  Delete(id : number) {
    return this._client.delete<Joueur>(this.url + "api/Joueur/" + id);
  }

}
