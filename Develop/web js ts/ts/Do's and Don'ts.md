https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html

## General Types

### [](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#number-string-boolean-symbol-and-object)`Number`, `String`, `Boolean`, `Symbol` and `Object`

❌ **Don’t** ever use the types `Number`, `String`, `Boolean`, `Symbol`, or `Object` These types refer to non-primitive boxed objects that are almost never used appropriately in JavaScript code.

`   /* WRONG */  function reverse(s: String): String;   `

✅ **Do** use the types `number`, `string`, `boolean`, and `symbol`.

`   /* OK */  function reverse(s: string): string;   `

Instead of `Object`, use the non-primitive `object` type ([added in TypeScript 2.2](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#object-type)).



