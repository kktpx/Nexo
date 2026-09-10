export interface Repository<T> {
  getAll(): T[];
  getById(id: string): T | undefined;
  create(item: T): T;
  update(id: string, item: Partial<T>): T | undefined;
  delete(id: string): boolean;
}
