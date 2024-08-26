- km-drawer-content-wrapper 小屏显示正常
```css
.km-drawer-content-wrapper {
  max-width: 100vw;
}
```

- 内部内容最小宽度，产生滚动
```tsx
  const width = type === 'smartbi' ? 1200 : 600

  return (
    <Drawer
      title={item?.cnName}
      width={width + 80} zIndex={1001} visible={!!item}
      contentWrapperStyle={{ maxWidth: '100vw' }}
      onClose={() => cancel()}
    >
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <div style={{ width }}>
```
`contentWrapperStyle` 是draw宽度，`ant-drawer-body` 下面是`overflowX`容器