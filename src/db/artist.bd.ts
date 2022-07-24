import { Artist } from 'src/modules/artists/entities/artist.entity';
import AlbumDB from './album.bd';
import TrackDB from './track.bd';

export default class ArtistDB {
  static artists: Map<string, Artist>;
  constructor() {
    ArtistDB.artists = new Map<string, Artist>();
  }

  create(artist: Artist) {
    ArtistDB.artists.set(artist.id, artist);
  }
  delete(id: string) {
    if (!ArtistDB.artists.has(id)) return undefined;
    const artist = ArtistDB.artists.get(id);
    ArtistDB.artists.delete(id);
    TrackDB.tracks.forEach((track, key) => {
      if (track.artistId == id) track.artistId = null;
      TrackDB.tracks.set(key, track);
    });
    AlbumDB.data.forEach((album, key) => {
      if (album.artistId == id) album.artistId = null;
      AlbumDB.data.set(key, album);
    });
    return artist;
  }
  update(artist: Artist) {
    if (!ArtistDB.artists.has(artist.id)) return undefined;
    ArtistDB.artists.set(artist.id, artist);
    return artist;
  }
  findOne(id: string): Artist {
    return ArtistDB.artists.get(id);
  }
  findAll(): Artist[] {
    return [...ArtistDB.artists.values()];
  }
}
