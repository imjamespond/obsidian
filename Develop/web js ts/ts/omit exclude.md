```ts
Exclude<"a" | "b" | "c", "a">;
// "b"|"c"

Omit<{
  name: string;
  age: number;
  salary?: number;
}, "age">;
/*
{
  name: string; 
  salary?: number;
}
*/

```