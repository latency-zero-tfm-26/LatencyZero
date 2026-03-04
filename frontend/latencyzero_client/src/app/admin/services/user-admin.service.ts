import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserAdminHttpService } from './user-admin-http.service';
import { UserAdminDTO } from '../interfaces/userAdmin.interface';

@Injectable({
  providedIn: 'root',
})
export class UserAdminService {
  private http = inject(UserAdminHttpService);

  private _users = new BehaviorSubject<UserAdminDTO[]>([]);
  public users$ = this._users.asObservable();

  loadUsers() {
    return this.http.getAllUsers().pipe(
      tap((users) => {
        this._users.next(users);
      })
    );
  }

  toggleRole(user_id: number) {
    return this.http.toggleUserRole(user_id).pipe(
      tap((updatedUser) => {
        this.updateUserInState(updatedUser);
      })
    );
  }

  banUser(user_id: number) {
    return this.http.banUser(user_id).pipe(
      tap((updatedUser) => {
        this.updateUserInState(updatedUser);
      })
    );
  }

  private updateUserInState(updatedUser: UserAdminDTO) {
    const current = this._users.getValue();

    const updated = current.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );

    this._users.next(updated);
  }
}
