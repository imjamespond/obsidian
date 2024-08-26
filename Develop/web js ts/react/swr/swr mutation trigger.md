
- 对比前后keyword无差异时强制更新
```tsx
  <KmInput.Search placeholder='全文检索' enterButton allowClear onSearch={(val) => {
	dispatch({ type: 'keyword', payload: val })
	if (keyword.current === val || val === "") {
	  mutate(undefined)
	}
	kmDebug(val, keyword.current)
```

--- 

```ts
type SaveType = SWRMutationResponse<any, any, saveArgs>['trigger'];

const getCols = (Save: SaveType, env: number): TableColumnType<Report>[] => [
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: (_, record,) => {
      return <Space>
        <Button type='link' size='small' onClick={async () => {
          try {
            await del({ params: { id: record.id } })
            message.success("删除成功！")
          } catch (error) {
            message.error(JSON.stringify(error))
          }
          mutate({ url: 'safetyPerformanceManagement.list', args: { params: { env } } }, undefined)
        }} >删除</Button>
      </Space>
    }
  },
]

function(){
  const { trigger: Save } = useSWRMutation<any, any, string, saveArgs>(
    'save', service.informationManagement.save
  )

  const cols = useMemo(() => {
    return getCols(Save, env)
  }, [env])
}
```