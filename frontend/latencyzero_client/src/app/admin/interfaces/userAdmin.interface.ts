export interface UserAdminDTO {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'banned';
  create_at: string;
}
