import { Repository } from "./IRepository";

export class LocalStorageRepository<T extends { id: string }> implements Repository<T> {
  private key: string;
  private initialData: T[];

  constructor(key: string, initialData: T[] = []) {
    this.key = key;
    this.initialData = initialData;
    
    // Initialize if empty
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem(this.key);
      if (!existing) {
        localStorage.setItem(this.key, JSON.stringify(this.initialData));
      }
    }
  }

  getAll(): T[] {
    if (typeof window === "undefined") return this.initialData;
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  getById(id: string): T | undefined {
    return this.getAll().find((item) => item.id === id);
  }

  create(item: T): T {
    const items = this.getAll();
    items.push(item);
    if (typeof window !== "undefined") {
      localStorage.setItem(this.key, JSON.stringify(items));
    }
    return item;
  }

  update(id: string, itemUpdates: Partial<T>): T | undefined {
    const items = this.getAll();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return undefined;

    items[index] = { ...items[index], ...itemUpdates };
    if (typeof window !== "undefined") {
      localStorage.setItem(this.key, JSON.stringify(items));
    }
    return items[index];
  }

  delete(id: string): boolean {
    const items = this.getAll();
    const filtered = items.filter((i) => i.id !== id);
    if (items.length === filtered.length) return false;

    if (typeof window !== "undefined") {
      localStorage.setItem(this.key, JSON.stringify(filtered));
    }
    return true;
  }
}
