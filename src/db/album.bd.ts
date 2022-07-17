import { Album } from 'src/modules/albums/entities/album.entity';

export default class AlbumDB {
  static data: Map<string, Album>;
  constructor() {
    AlbumDB.data = new Map<string, Album>();
  }

  create(entity: Album) {
    AlbumDB.data.set(entity.id, entity);
  }
  delete(id: string) {
    if (!AlbumDB.data.has(id)) return undefined;
    const entity = AlbumDB.data.get(id);
    AlbumDB.data.delete(id);
    return entity;
  }
  update(entity: Album) {
    if (!AlbumDB.data.has(entity.id)) return undefined;
    AlbumDB.data.set(entity.id, entity);
    return entity;
  }
  findOne(id: string): Album {
    return AlbumDB.data.get(id);
  }
  findAll(): Album[] {
    return [...AlbumDB.data.values()];
  }
}
