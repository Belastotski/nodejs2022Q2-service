import { PartialType } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { isNull } from 'lodash';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, val) => !isNull(val))
  @IsUUID()
  artistId: string | null;

  @ValidateIf((_, val) => !isNull(val))
  @IsUUID()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
