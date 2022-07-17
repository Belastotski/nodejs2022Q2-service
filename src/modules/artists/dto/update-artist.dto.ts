import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ description: 'Artist name', nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Grammy', nullable: true })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
