import localforage from 'localforage';

interface IndexedDBConfig {
    dbName: string;
    objectStoreName: string;
    keyPath: string;
  }
  
  export class IndexedDBService<T> {
    private dbName: string;
    private objectStoreName: string;
    private keyPath: string;
    private db: IDBDatabase | null = null;
  
    constructor(config: IndexedDBConfig) {
      this.dbName = config.dbName;
      this.objectStoreName = config.objectStoreName;
      this.keyPath = config.keyPath;
    }
  
    private openDatabase(): Promise<IDBDatabase> {
      return new Promise((resolve, reject) => {
        if (this.db) {
          resolve(this.db);
          return;
        }
  
        const request = indexedDB.open(this.dbName, 1);
  
        request.onerror = (event) => {
          reject(`Database open error: ${(event.target as IDBRequest).error}`);
        };
  
        request.onsuccess = (event) => {
          this.db = (event.target as IDBRequest).result;
          resolve(this.db);
        };
  
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBRequest).result;
          if (!db.objectStoreNames.contains(this.objectStoreName)) {
            db.createObjectStore(this.objectStoreName, { keyPath: this.keyPath });
          }
        };
      });
    }
  
    async storeData(data: T[]): Promise<void> {
      try {
        const db = await this.openDatabase();
        const transaction = db.transaction(this.objectStoreName, 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
  
        data.forEach((item) => {
          objectStore.put(item);
        });
  
        return new Promise<void>((resolve, reject) => {
          transaction.oncomplete = () => resolve();
          transaction.onerror = (event) => reject(`Transaction error: ${(event.target as IDBRequest).error}`);
        });
      } catch (error) {
        console.error('Error storing data in IndexedDB:', error);
      }
    }
  
    async getData(): Promise<T[]> {
      try {
        const db = await this.openDatabase();
        const transaction = db.transaction(this.objectStoreName, 'readonly');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const getAllRequest = objectStore.getAll();
  
        return new Promise<T[]>((resolve, reject) => {
          getAllRequest.onsuccess = (event) => resolve((event.target as IDBRequest<T[]>).result);
          getAllRequest.onerror = (event) => reject(`Get all error: ${(event.target as IDBRequest).error}`);
        });
      } catch (error) {
        console.error('Error getting data from IndexedDB:', error);
        return [];
      }
    }    

    async setLastUpdateTime(timestamp: number) {
      await localforage.setItem('fruits_last_update', timestamp);
    }
    
    async getLastUpdateTime() {
      return await localforage.getItem('fruits_last_update');
    }
  }