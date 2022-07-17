import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import ArtistDB from 'src/db/artist.bd';

@Injectable()
export class ArtistsService {
  private artists = new ArtistDB();

  create(createArtistDto: CreateArtistDto) {
    const id = v4();
    const { name, grammy } = createArtistDto;
    const artist = new Artist(id, name, grammy);
    if (!artist) {
      throw new HttpException('Wrong data', HttpStatus.BAD_REQUEST);
    }
    this.artists.create(artist);
    return artist;
  }

  findAll() {
    return this.artists.findAll();
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artitst = this.artists.findOne(id);
    if (!artitst)
      throw new HttpException('No found Artist', HttpStatus.NOT_FOUND);
    return artitst;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.findOne(id);
    if (!artist) {
      throw new HttpException('No found Artist', HttpStatus.NOT_FOUND);
    }
    let { name, grammy } = updateArtistDto;
    if (!name) name = artist.name;
    if (grammy === undefined) grammy = artist.grammy;
    const newArtist = new Artist(id, name, grammy);
    return this.artists.update(newArtist);
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.findOne(id);
    if (!artist) {
      throw new HttpException('No found Artist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }
}
