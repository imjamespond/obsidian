```ts
  const mouseover = fromEventPattern<any>(
    (handler) => myChart.on('mouseover', handler),
    (handler) => myChart.off('mouseover', handler)
  )
  const mouseout = fromEventPattern<any>(
    (handler) => myChart.on('mouseout', handler),
    (handler) => myChart.off('mouseout', handler)
  )
  merge(mouseover, mouseout.pipe(map(() => undefined)))
    .pipe(
      debounceTime(300),
      filter((e) => !!e) /* 过虑掉最后鼠标移出事件 */
    )
    .subscribe(
      function (params) {
        const node = (params.data as NodeMetaData)
        if (node.nodeData) {
          console.debug('mouseover', node)
        }
      }
    )
```