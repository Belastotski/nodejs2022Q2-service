import { Album } from 'src/modules/albums/entities/album.entity';

export default class AlbumDB {
  data: Map<string, Album>;
  constructor() {
    this.data = new Map<string, Album>();
  }

  create(entity: Album) {
    this.data.set(entity.id, entity);
  }
  delete(id: string) {
    if (!this.data.has(id)) return undefined;
    const entity = this.data.get(id);
    this.data.delete(id);
    return entity;
  }
  update(entity: Album) {
    if (!this.data.has(entity.id)) return undefined;
    this.data.set(entity.id, entity);
    return entity;
  }
  findOne(id: string): Album {
    return this.data.get(id);
  }
  findAll(): Album[] {
    return [...this.data.values()];
  }
}
