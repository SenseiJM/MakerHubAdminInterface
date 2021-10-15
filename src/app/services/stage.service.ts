import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Stage } from '../interfaces/Stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private url: string = environment.ApiUrl;

  constructor(private _client: HttpClient) { }

  AddStage(nouvStage: Stage): Observable<Stage[]> {
    return this._client.post<Stage[]>(this.url + "api/Stage", nouvStage);
  }

  Update(modifiedStage: Stage, id: number): Observable<Stage> {
    return this._client.put<Stage>(this.url + "api/Stage" + id, modifiedStage);
  }

  GetAll(): Observable<Stage[]> {
    return this._client.get<Stage[]>(this.url + "api/Stage");
  }

  GetByID(id: number): Observable<Stage> {
    return this._client.get<Stage>(this.url + "api/Stage/ByID/" + id);
  }

  Delete(id: number): Observable<Stage> {
    return this._client.delete<Stage>(this.url + "api/Stage/" + id)
  }

}
