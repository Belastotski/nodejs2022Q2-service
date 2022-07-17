import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User identifier', nullable: false })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;
}
