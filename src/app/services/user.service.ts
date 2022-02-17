import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { SearchService } from './search.service';
import { User } from '../interfaces';
import { Users } from '../components/users-block/users-block.component';

@Injectable()
export class UserService {
  isUsers: boolean = false;

  headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  requestOptions = {
    headers: new Headers(this.headerDict),
  };

  constructor(
    private httpClient: HttpClient,
    private searchService: SearchService
  ) {}

  getUsers(name: string): Observable<any> {
    // @ts-ignore
    return new Observable<any>();
  }

  public getSearchUsers(name: string) {
    return this.httpClient.get<Users>(
      `https://api.github.com/search/users?q=${name}&sort=stars&per_page=20`
    );
  }

  getUser(login: string): Observable<any> {
    return this.httpClient.get<any>(`https://api.github.com/users/${login}`);
  }

  user(): Observable<any> {
    return this.searchService.$search.pipe(
      switchMap((name: string) => {
        return this.getUsers(name);
      }),
      switchMap((response: any) => {
        if (response) this.isUsers = true;
        console.log(this.isUsers);
        return response['items'];
      })
    );
  }
}
