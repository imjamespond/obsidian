

> [!NOTE] ==Extract== 实现更加简洁
> 通过辅助接口 `IResult` 进行类型绑定 约束， hasResult 为true 时， 结果必将返回 `[boolean, R | undefined]>`


```ts
import { createSignal } from "solid-js";
import { useMsg } from "./contex";

type IResult<E, R> = { hasResult: E, result: R }
type Result<R> = IResult<true, [boolean, R | undefined]> | IResult<undefined, boolean>

export default function useTryCatch<T extends Misc.AnyType[], R, E extends true | void = void>(callback: (...args: T) => Promise<R>, hasResult?: E) {
  const [loading, set_loading] = createSignal(false);
  const msg = useMsg();

  type ResultType = Extract<Result<R>, { hasResult: E }>
  type Func = (...args: T) => Promise<ResultType['result']>;

  const cb = async (...args: T) => {
    set_loading(true);
    try {
      const result = await callback(...args);
      set_loading(false);
      if (hasResult === true) return [true, result] as const;
      return true;
    } catch (error) {
      console.error(error);
      if (error) {
        if (typeof error === "string") {
          msg.error(error);
        } else if (error instanceof DOMException) {
          msg.error(error.message);
        } else {
          msg.error(JSON.stringify(error));
        }
      } else {
        msg.error("未知错误");
      }
      set_loading(false);
      if (hasResult) return [false, undefined] as const;
      return false;
    }
    // eslint-disable-next-line
  };

  return [cb as Func, loading] as const;
}

// function fetcher(args: { foo: string, bar: number }) {
//   const status = "ok"
//   return Promise.resolve({ args, status })
// }
// (async () => {
//   // const [fetcherFn ] = useTryCatch(fetcher,true)
//   // const [ok, rs] = await fetcherFn({
//   //   foo: "",
//   //   bar: 0
//   // })

//   // const [fetcherFn] = useTryCatch(fetcher, false) // wrong
//   // const [fetcherFn] = useTryCatch(fetcher, undefined)
//   // const [fetcherFn] = useTryCatch(fetcher)
//   // const ok = await fetcherFn({
//   //   foo: "",
//   //   bar: 0
//   // })
// })()

```