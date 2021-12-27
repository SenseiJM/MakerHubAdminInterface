import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JoueurSouperIndexDTO } from '../interfaces/JoueurSouper';

@Injectable({
  providedIn: 'root'
})
export class JoueurSouperService {

  private _url: string = environment.ApiUrl;

  constructor(private _client: HttpClient) { }

  GetBySouperID(id: number) : Observable<JoueurSouperIndexDTO[]> {
    return this._client.get<JoueurSouperIndexDTO[]>(this._url + "api/JoueurSouper/BySouperID/" + id);
  }

}
