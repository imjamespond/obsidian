```tsx
const menuItems = useMemo(() => {
  return menus.map((item) => {
    return { item, nodeRef: createRef<HTMLDivElement>() };
  });
}, [menus]);

menuItems.map(({ item, nodeRef }, i) => {
  return (
    <CSSTransition key={item} nodeRef={nodeRef} timeout={5000} classNames="_km_item" in={reorder === i}>
      <div
        ref={nodeRef} />
  )
})
```
css
```
// "&._km_item-enter-done": {},
// "&._km_item-exit-done": {},
"&._km_item-enter": {
  transform: "translateX(110px) translateY(0px)",
  transition: "transform 3s",
},
"&._km_item-exit": {
  transform: "translateX(110px) translateY(0px)",
  transition: "transform 3s",
},
// "&._km_item-enter-active": {},
// "&._km_item-exit-active": {},
```