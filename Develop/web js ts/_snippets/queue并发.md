```ts
import { kmDebug } from "./misc";

export type Task = { (name: string): Promise<void> };
export async function queueStart(tasks: Task[], size = 1) {
  const queue = (function* () {
    for (let i = 0; i < tasks.length; i++) {
      yield tasks[i];
    }
  })();
  let finished = false;
  const handle = async (name: string) => {
    for (;;) {
      const { done, value: task } = queue.next();
      if (done) {
        finished = true;
      }
      if (finished) {
        break;
      } else if (task) {
        await task(name);
      }
    }
  };
  const joinAll: Promise<void>[] = [];
  for (let i = 0; i < size; i++) {
    const name = `thread-${i}`;
    const join = handle(name).then(() => {
      kmDebug(name, "end", new Date().toLocaleTimeString());
    });
    joinAll.push(join);
  }
  // return Promise.all(joinAll);
  for (const join of joinAll) {
    await join;
  }
}

export function getTask(promise: Promise<unknown>): Task {
  return async (name) => {
    const begin = Date.now()
    kmDebug(name, "task begin");
    await promise;
    kmDebug(name, "task done", (Date.now() - begin)*0.001);
  };
}

// getTask(Promise.resolve(1))
// getTask(Promise.resolve("abc"))
// getTask(Promise.resolve({}))
```