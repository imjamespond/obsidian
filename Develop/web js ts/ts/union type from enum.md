See [TS4.1 ANSWER](https://stackoverflow.com/a/64966647/2887218):
With [Typescript 4.1](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/), it can be done!

```javascript
enum Weekday {
  MONDAY = 'mon',
  TUESDAY = 'tue',
  WEDNESDAY = 'wed'
}

type WeekdayType = `${Weekday}`;
```

And for number enums, thanks to @okku:

```javascript
enum ThreeDigits {
  ZERO = 0,
  ONE = 1,
  TWO = 2
}

type ThreeDigitsType = `${ThreeDigits}` extends `${infer T extends number}` ? T : never;
```