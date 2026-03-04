import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminService } from '../../services/user-admin.service';
import { UserAdminDTO } from '../../interfaces/userAdmin.interface';
import { JwtService } from '../../../core/services/jwt.service';


@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-page.html',
})
export class AdminUserPage implements OnInit {
  private userAdminService = inject(UserAdminService);
  private jwtService = inject(JwtService);

  users$ = this.userAdminService.users$;
  currentUsername = this.jwtService.getName();

  ngOnInit(): void {
    this.userAdminService.loadUsers().subscribe();
  }

  toggleRole(user: UserAdminDTO) {
    this.userAdminService.toggleRole(user.id).subscribe();
  }

  banOrUnban(user: UserAdminDTO) {
    this.userAdminService.banUser(user.id).subscribe();
  }

  trackById(index: number, user: UserAdminDTO) {
    return user.id;
  }

  isCurrentUser(user: UserAdminDTO): boolean {
    return user.username === this.currentUsername;
  }
}
