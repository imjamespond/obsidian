```ts
import { useEffect, useState } from 'react';
import { Arguments, mutate } from 'swr';

/**
 * 每次key变动先mutate,再返回代理给swr请求,防止缓存
 * @param key 
 * @returns 
 */
export function useMutateBefore<T extends Arguments>(key: T) {
  const [keyState, setKeyState] = useState<T | null>(null);
  useEffect(() => {
    setKeyState((prev) => {
      // prev不为null，有可能与key相同，如果mutate会造成state不更新，key不变swr也不会重新请求数。
      // TODO 要作deep compare，因此为了简单，只判断为null才mutate
      if (prev === null && null !== key) {
        mutate(key, undefined, { revalidate: false });
      }
      return key;
    });
    console.debug(key);
  }, [key]);

  return keyState;
}

```
==key要保证避免deadloop， 因此deps尽量不用object，否则每次render其地址都不同==

示例：
```ts
  const getThemeGraphKey = useMemo(() => {
    return nodeType === 'theme group' ||
      (nodeType === 'theme' && subGraph === '1')
      ? 'datamodeler.getThemeGraph'
      : null;
  }, [nodeType, subGraph]);
  const getThemeGraphState = useMutateBefore(getThemeGraphKey);
```