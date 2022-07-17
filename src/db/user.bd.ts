import { User } from 'src/modules/users/entities/user.entity';

export default class UserDB {
  users: Map<string, User>;
  constructor() {
    this.users = new Map<string, User>();
  }

  create(user: User) {
    this.users.set(user.id, user);
  }
  delete(id: string) {
    if (!this.users.has(id)) return undefined;
    const user = this.users.get(id);
    this.users.delete(id);
    return user;
  }
  update(user: User) {
    if (!this.users.has(user.id)) return undefined;
    this.users.set(user.id, user);
    return user;
  }
  findOne(id: string): User {
    const user = this.users.get(id);
    if (!user) return undefined;
    delete user.password;
    return user;
  }
  findAll(): User[] {
    return [...this.users.values()].map((user) => (delete user.password, user));
  }
}
