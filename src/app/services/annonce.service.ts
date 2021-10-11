import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Annonce } from '../interfaces/Annonce';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private url: string = environment.ApiUrl;

  constructor(private _client : HttpClient) { }

  AddAnnonce(nouvAnnonce : Annonce) : Observable<Annonce[]> {
    return this._client.post<Annonce[]>(this.url + "api/Annonce", nouvAnnonce);
  }

  Update(modifiedAnnonce : Annonce, id: number) : Observable<Annonce> {
    return this._client.put<Annonce>(this.url + "api/Annonce/" + id, modifiedAnnonce);
  }

  GetAll() : Observable<Annonce[]> {
    return this._client.get<Annonce[]>(this.url + "api/Annonce");
  }

  GetByID(id : number) : Observable<Annonce> {
    return this._client.get<Annonce>(this.url + "api/Annonce/byID/" + id);
  }

  GetByTitle(title: string) : Observable<Annonce[]> {
    return this._client.get<Annonce[]>(this.url + "api/Annonce/byTitle/" + title);
  }

  Delete(id : number) {
    return this._client.delete<Annonce>(this.url + "api/Annonce/" + id);
  }

}
