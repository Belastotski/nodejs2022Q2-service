import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'User identifier', nullable: false })
  oldPassowrd: string;

  @ApiProperty({ description: 'User password', nullable: false })
  newPassword: string;
}
