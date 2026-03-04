import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_USERS, PATCH_USERS_BAN, PATCH_USERS_ROLE } from '../../config';
import { UserAdminDTO } from '../interfaces/userAdmin.interface';

@Injectable({
  providedIn: 'root',
})
export class UserAdminHttpService {
  private http = inject(HttpClient);

  getAllUsers(): Observable<UserAdminDTO[]> {
    return this.http.get<UserAdminDTO[]>(GET_USERS);
  }

  toggleUserRole(user_id: number): Observable<UserAdminDTO> {
    return this.http.patch<UserAdminDTO>(
      `${PATCH_USERS_ROLE}${user_id}`,
      {}
    );
  }

  banUser(user_id: number): Observable<UserAdminDTO> {
    return this.http.patch<UserAdminDTO>(
      `${PATCH_USERS_BAN}${user_id}`,
      {}
    );
  }
}
