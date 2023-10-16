export class Auth {
  public id: number;
  public role: Role;
  public fullName: string;
  public userName: string;

  constructor(id: number, role: Role, fullName: string, userName: string) {
    this.id = id;
    this.role = role;
    this.fullName = fullName;
    this.userName = userName;
  }
}

export enum Role {
  Admin = 'admin',
  User = 'user',
}
