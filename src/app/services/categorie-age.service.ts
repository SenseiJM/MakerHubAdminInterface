import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CategorieAge } from '../interfaces/CategorieAge';

@Injectable({
  providedIn: 'root'
})
export class CategorieAgeService {

  private url: string = environment.ApiUrl;

  constructor(private _client : HttpClient) { }

  GetAll() : Observable<CategorieAge[]> {
    return this._client.get<CategorieAge[]>(this.url + "api/CategorieAge");
  }

}
