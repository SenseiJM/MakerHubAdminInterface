import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Souper } from '../interfaces/Souper';
import { SouperAddDTO } from '../interfaces/SouperAddDTO';

@Injectable({
  providedIn: 'root'
})
export class SouperService {

  private url: string = environment.ApiUrl;

  constructor(private _client: HttpClient) { }

  AddSouper(nouvSouper: SouperAddDTO): Observable<SouperAddDTO[]> {
    return this._client.post<SouperAddDTO[]>(this.url + "api/Souper", nouvSouper);
  }

  GetAll(): Observable<Souper[]> {
    return this._client.get<Souper[]>(this.url + "api/Souper/All");
  }

}
