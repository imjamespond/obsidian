- 限定两种参数互斥
```ts
export default function useScrollEnd(opt: { container: React.RefObject<HTMLElement> } | { getBody: { (): Element | undefined | null }, container?: never }) {
// ...
const body = 'getBody' in opt ? opt.getBody() : opt.container?.current
```
