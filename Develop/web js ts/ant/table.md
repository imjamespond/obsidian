```tsx
type filterDropdown = Extract<TableColumnType<unknown>['filterDropdown'], Function>
type searchParams = { search: Function, sKey: string, style?: CSSProperties }
export function Search({ search, sKey, style, selectedKeys, setSelectedKeys, confirm, clearFilters }: searchParams & Parameters<filterDropdown>[0]) {
  // const [val, set_val] = useState<string>()
  // useEffect(() => {
  //   set_val(undefined)
  // }, [visible])
  return <Fragment>
    {/* {JSON.stringify(visible)} */}
    <Input.Search
      style={style ?? { width: 150 }} size='small'
      allowClear
      // value={val} onChange={(e) => {
      //   set_val(e.target.value)
      // }}
      value={selectedKeys[0]} 
      onChange={e => {
        const val = e.target.value
        setSelectedKeys(val ? [val] : [])
        if (!val) {
          // clearFilters?.()
          confirm(); // 清除搜索标记
        }
      }}
      onSearch={(value) => {
        search({ [sKey]: value }) 
        confirm(/* { closeDropdown: true } */); //标记搜索
      }} />
  </Fragment>
}

export function getColumnSearchProps(searchParams: searchParams) {
  const searchCol: TableColumnType<any> = {
    filterDropdown(args) {
      console.debug(args.selectedKeys)
      return <Search style={{ width: 120 }} {...args} {...searchParams} />
    },
    filterIcon: (_filtered: boolean) => (
      <SearchOutlined />
      // JSON.stringify({_filtered})
    ),
  }
  return searchCol as any
}
```