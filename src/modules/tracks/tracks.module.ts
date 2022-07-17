import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, ArtistsService, AlbumsService],
})
export class TracksModule {}
