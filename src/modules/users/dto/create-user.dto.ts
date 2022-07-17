import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User identifier', nullable: false })
  login: string;

  @ApiProperty({ description: 'User password', nullable: false })
  password: string;
}
