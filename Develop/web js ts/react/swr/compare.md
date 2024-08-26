https://github.com/vercel/swr/blob/main/_internal/src/utils/hash.ts#L20
`import { stableHash } from 'swr/_internal';`
有序hash，深层对比
{ test: stableHash({ foo: 2, bar: 1 }), test2: stableHash({ bar: 1,foo: 2, }) }
