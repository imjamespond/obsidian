```ts
    const dataMapSub = DataMapSubject.pipe(
      tap((data) => {
        if (data.type === DataMapActType.Layout) {
          setWaiting(true)
        }
      }),
      debounceTime(100)
    ).subscribe((data) => {
```