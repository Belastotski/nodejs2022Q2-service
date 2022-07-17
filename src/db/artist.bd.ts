import { Artist } from 'src/modules/artists/entities/artist.entity';

export default class ArtistDB {
  artists: Map<string, Artist>;
  constructor() {
    this.artists = new Map<string, Artist>();
  }

  create(artist: Artist) {
    this.artists.set(artist.id, artist);
  }
  delete(id: string) {
    if (!this.artists.has(id)) return undefined;
    const artist = this.artists.get(id);
    this.artists.delete(id);
    return artist;
  }
  update(artist: Artist) {
    if (!this.artists.has(artist.id)) return undefined;
    this.artists.set(artist.id, artist);
    return artist;
  }
  findOne(id: string): Artist {
    return this.artists.get(id);
  }
  findAll(): Artist[] {
    return [...this.artists.values()];
  }
}
