import { Track } from 'src/modules/tracks/entities/track.entity';

export default class TrackDB {
  tracks: Map<string, Track>;
  constructor() {
    this.tracks = new Map<string, Track>();
  }

  create(track: Track) {
    this.tracks.set(track.id, track);
  }
  delete(id: string) {
    if (!this.tracks.has(id)) return undefined;
    const track = this.tracks.get(id);
    this.tracks.delete(id);
    return track;
  }
  update(track: Track) {
    if (!this.tracks.has(track.id)) return undefined;
    this.tracks.set(track.id, track);
    return track;
  }
  findOne(id: string): Track {
    return this.tracks.get(id);
  }
  findAll(): Track[] {
    return [...this.tracks.values()];
  }
}
