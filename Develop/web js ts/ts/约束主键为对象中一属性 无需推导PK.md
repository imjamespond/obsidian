[[DBStore]]

> [!NOTE]
> PK 
> **extends** `(keyof T & string) | (T extends Persistence.Item ? "id" : never) `
> 约束 PK类型为 T的其中属性 或 ==若当T为Item时，可为id，否则为无==
> **=** `T extends Persistence.Item ? "id" : never`
> 默认值 ==若当T为Item时，为id，否则为无，**即必须显示声明**==
> 

- 套一层initDB达成useDB，createContext共用模板参数
```ts
import { useMount, useSafeState } from "@commons/hooks";
import { DBStore, QueryOpt } from "@commons/indexedDB";
import { createContext, useRef, useState } from "react";
import { dbVer } from "./config";

/**
 * If T extends Item, PK is set to id as default,
 * Otherwise, PK must be set and is keyof T
 * @param dbName
 * @param dbStoreName
 * @param options
 * @returns
 */

export default function initDB<
  T extends object,
  PK extends (keyof T & string) | (T extends Persistence.ID ? "id" : never) = T extends Persistence.ID ? "id" : never
>() {
  type TWOK = Omit<T, PK> & { [K in PK]?: never };
  type Options = DBStore<T, PK>["options"];

  const useDB = (dbName: string, dbStoreName: string, options: T extends Persistence.ID ? Options : Misc.PartialRequired<Options, "storeParams">) => {
    const [opened, set_opened] = useSafeState(false);
    const [act] = useState(() => {
      console.log("init DBStore", dbStoreName);
      const db = new DBStore<T, string, TWOK>(dbName, dbStoreName, options);
      const openDB = async () => {
        try {
          await db.openDb(dbVer);
          set_opened(true);
        } catch (error) {
          logErr && console.error(error);
          throw error;
        }
      };
      const add = async (item: TWOK) => {
        try {
          await db.add(item);
        } catch (error) {
          logErr && console.error(error);
          throw error;
        }
      };
      const put = async (item: T) => {
        try {
          await db.put(item);
        } catch (error) {
          logErr && console.error(error);
          throw error;
        }
      };
      const batchAdd = async (items: TWOK[]) => {
        try {
          await db.batchAdd(items);
        } catch (error) {
          logErr && console.error(error);
          throw error;
        }
      };
      const batchPut = async (items: T[]) => {
        try {
          await db.batchPut(items);
        } catch (error) {
          logErr && console.error(error);
          throw error;
        }
      };
      const del = async (id: number) => {
        try {
          await db.del(id);
        } catch (error) {
          logErr && console.error(error);
          throw error;
        }
      };
      const query = async (options?: QueryOpt<T>) => {
        try {
          return await db.query(options);
        } catch (error) {
          logErr && console.error(error);
          throw error;
        }
      };
      const count = async (query?: QueryOpt<T>["query"]) => {
        try {
          return await db.count(query);
        } catch (error) {
          logErr && console.error(error);
          throw error;
        }
      };
      return {
        openDB,
        add,
        put,
        del,
        batchAdd,
        batchPut,
        query,
        count,
        db,
      };
    });

    const ref = useRef(act);

    useMount(() => {
      ref.current.openDB();
    });

    return [act, opened] as const;
  };

  const withoutPK = (item: TWOK) => item;

  const DBContext = createContext<ReturnType<typeof useDB>>(undefined as Any);

  return [DBContext, useDB, withoutPK] as const;
}

const logErr = false;

// const test: Persistence.CheckItem<{ foo: "bar"; iid: string },'iid'> = {
//   foo: "bar",
//   id: "aaa",
// };


```
--- 





```ts
import useDB from "@service/persistence/useDB";
import { dbName } from "@service/persistence/config";

export const dbStoreName = "catalogs";

export interface Catalog extends Persistence.Item {
  pid: number;
  name: string;
}

export function useDBStore() {
  return useDB<Catalog>(dbName, dbStoreName, {
    storeParams: "id",
    indexParams: [
      {
        name: "name",
        keyPath: "name",
        options: { unique: true },
      },
      {
        name: "pid",
        keyPath: "pid",
        options: { unique: false },
      },
    ],
  });
}

```