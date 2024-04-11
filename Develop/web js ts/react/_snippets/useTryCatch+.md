```ts
// 通过反射得到any[]
export type AnyParams = Parameters<typeof console.log>;
export type Any = AnyParams[0];


export function useTryCatch<T extends Misc.AnyParams, R, E extends boolean = false>(
  callback: (...args: T) => Promise<R>,
  deps: Parameters<typeof useCallback>[1],
  needResult?: E
) {
  const [loading, set_loading] = useSafeState(false);

  const msg = useMsg();

  type ExcludeResult = E extends true ? boolean : object
  type Result = readonly [boolean, R | undefined] | boolean;
  type Func<RS> = (...args: T) => Promise<RS>; 

  const cb = useCallback<Func<Result>>(async (...args) => {
    set_loading(true);
    try {
      const result = await callback(...args);
      set_loading(false);
      if (needResult) return [true, result] as const;
      return true;
    } catch (error) {
      console.error(error);
      if (error) {
        if (typeof error === 'string') {
          msg.error(error);
        } else if (typeof error === 'object' && typeof (error as Api.Error).message === 'string') {
          msg.error((error as Api.Error).message);
        } else if (typeof error === 'object' && typeof (error as Api.ApiError).ApiError.cnMessage === 'string') {
          msg.error((error as Api.ApiError).ApiError.cnMessage);
        }
      } else {
        msg.error('未知错误');
      }
      set_loading(false);
      if (needResult) return [false, undefined] as const;
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [cb as Func<Exclude<Result, ExcludeResult>>, loading] as const;
}
```

 - 不传返回值时
   ![[Pasted image 20240411143810.png|400]]

- 传true时，返回双值
  ![[Pasted image 20240411143859.png|500]]

- 传false时，返回单值
  ![[Pasted image 20240411144010.png|400]]
  