import { Track } from 'src/modules/tracks/entities/track.entity';

export default class TrackDB {
  static tracks: Map<string, Track>;
  constructor() {
    TrackDB.tracks = new Map<string, Track>();
  }

  create(track: Track) {
    TrackDB.tracks.set(track.id, track);
  }
  delete(id: string) {
    if (!TrackDB.tracks.has(id)) return undefined;
    const track = TrackDB.tracks.get(id);
    TrackDB.tracks.delete(id);
    return track;
  }
  update(track: Track) {
    if (!TrackDB.tracks.has(track.id)) return undefined;
    TrackDB.tracks.set(track.id, track);
    return track;
  }
  findOne(id: string): Track {
    return TrackDB.tracks.get(id);
  }
  findAll(): Track[] {
    return [...TrackDB.tracks.values()];
  }
}
