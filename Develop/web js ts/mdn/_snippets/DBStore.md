```ts
import { kmDebug } from "./misc";

// const DB_NAME = 'mdn-demo-indexeddb-epublications';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
// const DB_STORE_NAME = "publications";

export type QueryOpt<T extends object> = {
  query?: IDBValidKey | IDBKeyRange;
  direction?: IDBCursorDirection;
  index?: keyof T & string;
  count?: number;
};

/**
 * @description examples:
 *
 * https://mdn.github.io/dom-examples/indexeddb-api/index.html
 *
 * https://mdn.github.io/dom-examples/to-do-notifications/
 *
 * https://www.ruanyifeng.com/blog/2018/07/indexeddb.html
 */
export class DBStore<T extends object, PK extends /* keyof T &  */ string, TWOK = Omit<T, PK>> {
  db: IDBDatabase | undefined;
  dbName: string;
  dbStore: string;
  options: {
    storeParams: PK | IDBObjectStoreParameters;
    indexParams: { name: keyof T & string; keyPath: string | string[]; options?: IDBIndexParameters }[]; // define what data items the objectStore will contain
  };
  constructor(dbName: string, dbStoreName: string, options: typeof this.options) {
    this.dbName = dbName;
    this.dbStore = dbStoreName;
    this.options = options;
  }
  /**
   *
   * @param dbVer 变大时改变表结构
   */
  async openDb(dbVer?: number, opt?: { deleteObjectStore?: boolean }) {
    const { dbName, dbStore, options } = this;
    const req = window.indexedDB.open(dbName, dbVer ?? DB_VERSION);
    req.onsuccess = () => {
      this.db = req.result;
      kmDebug("openDb DONE", dbName);
    };
    req.onerror = (evt) => {
      this.db = req.result;
      kmDebug("openDb:", dbName, (evt.target as IDBRequest).error);
    };
    // The upgradeneeded event is fired when an attempt was made to open a database with a version number higher than its current version.
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest/upgradeneeded_event
    req.onupgradeneeded = (evt: IDBVersionChangeEvent) => {
      kmDebug("openDb.onupgradeneeded", evt); // evt.oldVersion
      const db = (evt.target as IDBOpenDBRequest).result;
      if (db.objectStoreNames.contains(this.dbStore)) {
        if (opt?.deleteObjectStore === true) {
          // 删除已有store，重新打开控制台后schema变化
          db.deleteObjectStore(this.dbStore);
        } else {
          // 已存在库不再新创建
          return;
        }
      }
      // 创建新库
      const store = db.createObjectStore(
        dbStore,
        typeof options.storeParams === "string" ? { keyPath: options.storeParams, autoIncrement: true } : options.storeParams
      );
      // 创建索引
      options.indexParams.forEach(({ name, keyPath, options }) => {
        store.createIndex(name, keyPath, options);
      });

      // const store = db.createObjectStore(dbStore, { keyPath: "id", autoIncrement: true });
      // store.createIndex("title", "title", { unique: false });
    };
  }

  /**
   * param {string} store_name
   * @param {string} mode either "readonly" or "readwrite"
   */
  getObjectStore(mode?: IDBTransactionMode) {
    const tx = this.db?.transaction(this.dbStore, mode);
    if (tx) {
      return tx.objectStore(this.dbStore);
    }
  }

  getTransaction(mode?: IDBTransactionMode, options?: Partial<IDBTransaction>) {
    const tx = this.db?.transaction(this.dbStore, mode);
    if (tx) {
      if (options) {
        if (options.oncomplete) tx.oncomplete = options.oncomplete;
        if (options.onerror) tx.onerror = options.onerror;
      }
      return [tx.objectStore(this.dbStore), tx] as const;
    }
  }

  clear() {
    return new Promise<void>((resolve, reject) => {
      const store = this.getObjectStore("readwrite");
      if (store === undefined) {
        reject();
        return;
      }
      const req = store.clear();
      req.onsuccess = function () {
        resolve();
      };
      req.onerror = (evt) => {
        reject((evt.target as IDBRequest).error);
      };
    });
  }

  async count(query?: IDBValidKey | IDBKeyRange) {
    const store = this.getObjectStore("readonly");
    if (store) {
      return await this._count(store, query);
    }
  }
  protected _count(store: IDBObjectStore, query?: IDBValidKey | IDBKeyRange) {
    return new Promise<number>((resolve, reject) => {
      // Requests are executed in the order in which they were made against the
      // transaction, and their results are returned in the same order.
      // Thus the count text below will be displayed before the actual pub list
      // (not that it is algorithmically important in this case).
      const req = store.count(query);
      req.onsuccess = (evt) => {
        resolve((evt.target as IDBRequest).result);
      };
      req.onerror = (evt) => {
        reject((evt.target as IDBRequest).error);
      };
    });
  }

  async query(options?: QueryOpt<T>) {
    const store = this.getObjectStore("readonly");
    if (store) {
      return await this._query(store, options);
    }
  }
  protected _query(objectStore: IDBObjectStore, options?: QueryOpt<T>) {
    const getReq = (): IDBRequest<T[]> => {
      if (options?.index) {
        const idx = objectStore.index(options.index);
        return idx.getAll(options.query, options.count);
      } else {
        return objectStore.getAll(options?.query, options?.count);
      }
    };
    return new Promise<T[]>((resolve, reject) => {
      const req = getReq();
      req.onsuccess = () => {
        const items = req.result;
        resolve(items);
      };
      req.onerror = (evt) => {
        reject((evt.target as IDBRequest).error);
      };
    });
  }
  // protected _queryByCursor(objectStore: IDBObjectStore, options?: QueryOpt<T>) {
  //   const getReq = (): {
  //     req: IDBRequest<IDBCursorWithValue | null>;
  //     get: { (query: IDBValidKey | IDBKeyRange): IDBRequest<T> };
  //   } => {
  //     if (options?.index) {
  //       const idx = objectStore.index(options.index);
  //       // idx.openKeyCursor()方法只获取每个对象的key值。
  //       return {
  //         req: idx.openCursor(options.query, options.direction),
  //         get(query) {
  //           return idx.get(query);
  //         },
  //       };
  //     } else {
  //       return {
  //         req: objectStore.openCursor(options?.query, options?.direction),
  //         get(query) {
  //           return objectStore.get(query);
  //         },
  //       };
  //     }
  //   };
  //   return new Promise<T[]>((resolve, reject) => {
  //     const { req, get } = getReq();
  //     const items: T[] = [];
  //     req.onsuccess = (evt) => {
  //       const cursor = (evt.target as IDBRequest).result as IDBCursorWithValue;
  //       // If the cursor is pointing at something, ask for the data
  //       if (cursor) {
  //         const _req = get(cursor.key); // store.get
  //         _req.onsuccess = (evt) => {
  //           const value = (evt.target as IDBRequest<T>).result;
  //           items.push(value);
  //         };
  //         // Move on to the next object in store
  //         cursor.continue();
  //       } else {
  //         // No more entries
  //         resolve(items);
  //       }
  //     };
  //     req.onerror = (evt) => {
  //       reject((evt.target as IDBRequest).error);
  //     };
  //   });
  // }

  async add(item: TWOK) {
    const store = this.getObjectStore("readwrite");
    if (store) {
      return await this._add(store, item);
    }
  }
  protected _add(store: IDBObjectStore, item: TWOK) {
    return new Promise<void>((resolve, reject) => {
      try {
        const req = store.add(item);
        req.onsuccess = function () {
          resolve();
        };
        req.onerror = (evt) => {
          reject((evt.target as IDBRequest).error);
        };
      } catch (e) {
        // if (e.name == "DataCloneError") kmDebug("This engine doesn't know how to clone a Blob, " + "use Firefox");
        reject(e);
      }
    });
  }

  async put(item: T) {
    const store = this.getObjectStore("readwrite");
    if (store) {
      return await this._put(store, item);
    }
  }
  protected _put(store: IDBObjectStore, item: T) {
    return new Promise<void>((resolve, reject) => {
      const req = store.put(item);
      req.onsuccess = () => {
        resolve();
      };
      req.onerror = (evt) => {
        reject((evt.target as IDBRequest).error);
      };
    });
  }

  async del(key: IDBValidKey | IDBKeyRange) {
    const store = this.getObjectStore("readwrite");
    if (store) {
      return await this._del(store, key);
    }
  }
  protected _del(store: IDBObjectStore, key: IDBValidKey | IDBKeyRange) {
    kmDebug("delete:", key);
    return new Promise<void>((resolve, reject) => {
      // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
      // the result of the Object Store Deletion Operation algorithm is
      // undefined, so it's not possible to know if some records were actually
      // deleted by looking at the request result.
      const req = store.get(key);
      req.onsuccess = (evt) => {
        const record = (evt.target as IDBRequest).result;
        kmDebug("record:", record);
        if (typeof record === "undefined") {
          kmDebug("No matching record found");
          return;
        }
        // Warning: The exact same key used for creation needs to be passed for
        // the deletion. If the key was a Number for creation, then it needs to
        // be a Number for deletion.
        const deleteReq = store.delete(key);
        deleteReq.onsuccess = function () {
          resolve();
        };
        deleteReq.onerror = (evt) => {
          reject((evt.target as IDBRequest).error);
        };
      };
      req.onerror = (evt) => {
        reject((evt.target as IDBRequest).error);
      };
    });
  }

  batchAdd(items: TWOK[]) {
    return new Promise<void>((resolve, reject) => {
      const tran = this.getTransaction("readwrite", {
        oncomplete() {
          resolve();
        },
        onerror(evt) {
          reject((evt.target as IDBRequest).error);
        },
      });
      if (tran) {
        const [store /* , tx */] = tran;
        items.forEach((item) => {
          store.add(item);
        });
        // Note that commit() doesn't normally have to be called —
        // a transaction will automatically commit when all outstanding requests have been satisfied and no new requests have been made.
        // tx.commit();

        // The abort() method of the IDBTransaction interface rolls back all the changes to objects in the database associated with this transaction.
        // tx.abort()
      } else {
        reject("invalid Transaction");
      }
    });
  }
}

```