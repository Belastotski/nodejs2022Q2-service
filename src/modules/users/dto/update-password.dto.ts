import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'User identifier', nullable: false })
  @IsString()
  @IsNotEmpty()
  oldPassowrd: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
