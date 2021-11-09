import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Club } from '../interfaces/Club';
import { Member } from '../interfaces/Member';
import { Team } from '../interfaces/Team';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private url: string = environment.ApiUrl;

  constructor(private _client : HttpClient) { }

  GetAllClubs(): Observable<Club[]> {
    return this._client.get<Club[]>(this.url + "api/Club/clubs");
  }

  GetClubByIndex(clubIndex : string): Observable<Club> {
    return this._client.get<Club>(this.url + "api/Club/clubs/" + clubIndex);
  }

  GetClubMembers(): Observable<Member[]> {
    return this._client.get<Member[]>(this.url + "api/Club/members");
  }

  GetTeams(): Observable<Team[]> {
    return this._client.get<Team[]>(this.url + "api/Club/teams");
  }

}
