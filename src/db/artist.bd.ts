import { Artist } from 'src/modules/artists/entities/artist.entity';

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
