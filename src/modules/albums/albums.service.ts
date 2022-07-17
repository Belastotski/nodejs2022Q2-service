import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import AlbumDB from 'src/db/album.bd';
import { v4, validate } from 'uuid';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private entities = new AlbumDB();
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const id = v4();
    const { name, year, artistId } = createAlbumDto;
    const entity = new Album(id, name, year, artistId);
    if (!entity) {
      throw new HttpException('Wrong data', HttpStatus.BAD_REQUEST);
    }
    this.entities.create(entity);
    return entity;
  }

  findAll() {
    return this.entities.findAll();
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const entity = this.entities.findOne(id);
    if (!entity)
      throw new HttpException('No found Album', HttpStatus.NOT_FOUND);
    return entity;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const entity = this.entities.findOne(id);
    if (!entity) {
      throw new HttpException('No found Album', HttpStatus.NOT_FOUND);
    }

    const { name, year, artistId } = {
      ...entity,
      ...updateAlbumDto,
    };
    const newEntity = new Album(id, name, year, artistId);
    return this.entities.update(newEntity);
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const entity = this.entities.findOne(id);
    if (!entity) {
      throw new HttpException('No found Album', HttpStatus.NOT_FOUND);
    }
    return entity;
  }
}
