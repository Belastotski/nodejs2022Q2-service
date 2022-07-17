import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import TrackDB from 'src/db/track.bd';
import { v4, validate } from 'uuid';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private tracks = new TrackDB();
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const id = v4();
    const { name, artistId, albumId, duration } = createTrackDto;
    const track = new Track(id, name, artistId, albumId, duration);
    if (!track) {
      throw new HttpException('Wrong data', HttpStatus.BAD_REQUEST);
    }
    this.tracks.create(track);
    return track;
  }

  findAll() {
    return this.tracks.findAll();
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.findOne(id);
    if (!track) throw new HttpException('No found track', HttpStatus.NOT_FOUND);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.findOne(id);
    if (!track) {
      throw new HttpException('No found Track', HttpStatus.NOT_FOUND);
    }

    const { name, artistId, albumId, duration } = {
      ...track,
      ...updateTrackDto,
    };
    const newTrack = new Track(id, name, artistId, albumId, duration);
    return this.tracks.update(newTrack);
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.findOne(id);
    if (!track) {
      throw new HttpException('No found Track', HttpStatus.NOT_FOUND);
    }
    return track;
  }
}
