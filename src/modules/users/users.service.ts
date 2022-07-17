import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import UserDB from 'src/db/user.bd';
import { v4, validate } from 'uuid';
import { User } from './entities/user.entity';
import { HttpException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = new UserDB();

  create(createUserDto: CreateUserDto) {
    const id = v4();
    const { login, password } = createUserDto;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const version = 1;
    const user = new User(id, login, password, version, createdAt, updatedAt);
    if (!user) {
      throw new HttpException('Wrong data', HttpStatus.BAD_REQUEST);
    }
    this.users.create(user);
    return user;
  }

  findAll() {
    return this.users.findAll();
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.findOne(id);
    if (!user) throw new HttpException('No found User', HttpStatus.NOT_FOUND);
    return user;
  }

  update(id: string, updatePasswwordDTO: UpdatePasswordDto) {
    const { newPassword, oldPassowrd } = updatePasswwordDTO;
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.findOne(id);
    if (!user) {
      throw new HttpException('No found User', HttpStatus.NOT_FOUND);
    }
    if (user.password !== oldPassowrd) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    const updatedAt = Date.now();
    const updateUser = new User(
      id,
      user.login,
      newPassword,
      user.version + 1,
      user.createdAt,
      updatedAt,
    );
    return this.users.update(updateUser);
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.findOne(id);
    if (!user) {
      throw new HttpException('No found User', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
