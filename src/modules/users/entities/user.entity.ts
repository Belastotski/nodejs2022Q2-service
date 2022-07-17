import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User identifier', nullable: false })
  id: string;

  @ApiProperty({ description: 'User identifier', nullable: false })
  login: string;

  @ApiProperty({ description: 'User password', nullable: false })
  password: string;

  @ApiProperty({ description: 'Version', nullable: true })
  version: number;

  @ApiProperty({ description: 'Timestamp of creation', nullable: false })
  createdAt: number;

  @ApiProperty({ description: 'Timestamp of last update', nullable: false })
  updatedAt: number;

  constructor(
    id: string,
    login: string,
    password: string,
    version: number, // integer number, increments on update
    createdAt: number, // timestamp of creation
    updatedAt: number, // timestamp of last update
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
