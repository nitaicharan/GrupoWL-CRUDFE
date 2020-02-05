import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';
import { map } from 'rxjs/operators';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: UserModel) {
    return this.http.post(`${environment.BACKEND_URL}/user`, user);
  }


  getUsers(): Observable<UserModel[]> {
    return this.http.get(`${environment.BACKEND_URL}/user`).pipe(
      map(mapUsers)
    );
  }

  getUser(id: string): Observable<UserModel> {
    return this.http.get(`${environment.BACKEND_URL}/user/${id}`).pipe(
      map(mapUser)
    );
  }

  setUser(user: UserModel) {
    return this.http.put(`${environment.BACKEND_URL}/user/`, user).pipe(
      map(mapUser)
    );
  }

  delUser(id: string) {
    return this.http.delete(`${environment.BACKEND_URL}/user/${id}`);
  }
}


function mapUsers(users: any[]) {
  return users.map(mapUser);
}

function mapUser(user: any) {
  user.dataNascimento = new Date(user.dataNascimento);

  return user;
}
