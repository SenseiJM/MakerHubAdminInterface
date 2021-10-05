import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classement } from '../classes/Classement';

@Injectable({
  providedIn: 'root'
})
export class ClassementService {

  private url: string = environment.ApiUrl;

  constructor(private _client : HttpClient) { }

  GetByID(id : number) : Observable<Classement> {
    return this._client.get<Classement>(this.url + "api/Classement/byID/" + id);
  }

  GetAll() : Observable<Classement[]> {
    return this._client.get<Classement[]>(this.url + "api/Classement");
  }

  AddClassement(nouvClassement : Classement) : Observable<Classement[]> {
    return this._client.post<Classement[]>(this.url + "api/Classement", nouvClassement);
  }

}
