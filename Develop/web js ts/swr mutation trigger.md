
```ts
type SaveType = SWRMutationResponse<any, any, saveArgs>['trigger'];

const getCols = (Save: SaveType, env: number): TableColumnType<Report>[] => [
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: (_, record,) => {
      return <Space>
        <Button size='small' type='link' shape="circle" onClick={() => {
          Save({ 
            params: { env }, 
            body: { reportId: record.id, reportName: 'foobar', sort: 1, } 
          })
        }}>添加报告</Button>
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