import { PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsUUID('4')
  artistId: string | null;
}
