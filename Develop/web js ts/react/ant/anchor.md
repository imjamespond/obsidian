- anchor 在modal 无动画问题
```tsx
export default function (props: Props) {
  const ref = useRef<HTMLElement>(null)
  const { act } = props
  const open = act?.type === ActType.Edit || act?.type === ActType.Add
  const title = act?.type === ActType.Edit ? `编辑逻辑模型：${act.payload.name}` : '新增逻辑模型'
  return <KmModal
    title={title}
    open={open}
    width={modalWidthLg}
    footer={null}
    onCancel={() => props.onClose()}
    destroyOnClose
    wrapProps={{ ref }}
  >
    <Box >
      <KmAnchor
        direction="horizontal"
        items={[
          {
            key: 'basic',
            href: '#basic',
            title: '基本信息',
          },
          {
            key: 'columns',
            href: '#columns',
            title: '字段编辑',
          },
          {
            key: 'relations',
            href: '#relations',
            title: '关系编辑',
          },
        ]}
        getContainer={()=>ref.current!}
      />
      <FC {...props} />
    </Box>
  </KmModal>
}
```

- `const ref = useRef<HTMLElement>(null)`
- `wrapProps={{ ref }}`  modal中取出wrapper，滚动容器
- `getContainer={()=>ref.current!}` 将容器传给anchor