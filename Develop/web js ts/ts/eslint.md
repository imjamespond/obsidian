- `{}`
```
  29:7   error  Don't use `{}` as a type. `{}` actually means "any non-nullish value".
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead.
- If you want a type meaning "empty object", you probably want `Record<string, never>` instead.
- If you really want a type meaning "any non-nullish value", you probably want `NonNullable<unknown>` instead  
```

