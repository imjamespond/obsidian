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
    if (null !== key) {
      mutate(key);
    }
    setKeyState(key);
  }, [key]);
  return keyState;
}

```
==key要保证避免deadloop==

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