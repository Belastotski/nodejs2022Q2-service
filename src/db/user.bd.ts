import { User } from 'src/modules/users/entities/user.entity';

export default class UserDB {
  static users: Map<string, User>;
  constructor() {
    UserDB.users = new Map<string, User>();
  }

  create(user: User) {
    UserDB.users.set(user.id, user);
  }
  delete(id: string) {
    if (!UserDB.users.has(id)) return undefined;
    const user = UserDB.users.get(id);
    UserDB.users.delete(id);
    return user;
  }
  update(user: User) {
    if (!UserDB.users.has(user.id)) return undefined;
    UserDB.users.set(user.id, user);
    return user;
  }
  findOne(id: string): User {
    const user = UserDB.users.get(id);
    if (!user) return undefined;
    delete user.password;
    return user;
  }
  findAll(): User[] {
    return [...UserDB.users.values()].map(
      (user) => (delete user.password, user),
    );
  }
}
