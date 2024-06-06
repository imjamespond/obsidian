- Modal [afterOpenChange](https://ant-design.antgroup.com/components/modal-cn#api) 后显示确保列宽正确

- 通过comfirm来确认有值，并关闭下拉框
```tsx
function DateRangeSearch({ selectedKeys, setSelectedKeys, confirm }: searchParams & Parameters<filterDropdown>[0]) {
  const mm:any = useMemo(() => {
    if (selectedKeys.length === 2) {
      return [moment(selectedKeys[0], "YYYY-MM-DD"), moment(selectedKeys[1], "YYYY-MM-DD")]
    }
  }, [selectedKeys])
  return <Fragment>
    <DatePicker.RangePicker bordered={false}
      value={mm}
      onChange={(mm, timeRange) => {
        if (mm === null) {
          setSelectedKeys([])
        } else {
          setSelectedKeys(timeRange) 
        }
      }}
    />
    <Button type='link' onClick={()=>confirm()}>确定</Button>
  </Fragment>
}

export function getColumnDateRangeProps(searchParams: searchParams) {
  const searchCol: TableColumnType<any> = {
    filterDropdown(args) {
      return <DateRangeSearch {...args} {...searchParams} />
    },
    filterIcon: (_filtered: boolean) => (
      <SearchOutlined />
    ),
  }
  return searchCol as any
}

```

Table中的onchange
```ts
	onChange={(
	  pagination/* : TablePaginationConfig */,
	  filters/* : Record<string, FilterValue> */,
	  sorter/* : SorterResult<DataType> */,
	) => {
	  const payload: PageParams = {}
	  if (filters) {
		Object.entries(filters).reduce((payload, [k, v]) => {
		  if (k === 'actualSendTime') {
			if (Array.isArray(v) && v.length === 2) {
			  (payload as any)['startTime'] = v[0];
			  (payload as any)['endTime'] = v[1];
			}
		  }
		  else if (Array.isArray(v)) {
			if (v.length === 1) {
			  (payload as any)[k] = v[0]
			}
		  }
		  return payload
		}, payload)
	  }
	  if (sorter) {
		type Sorter = Extract<typeof sorter, { columnKey?: React.Key }>
		const { field, order } = sorter as Sorter
		if (order === 'ascend') {
		  payload['sortingType'] = field as string
		  payload['sortingRule'] = 'ASC'
		} else if (order === 'descend') {
		  payload['sortingType'] = field as string
		  payload['sortingRule'] = 'DESC'
		}
	  }
	  if (pagination) {
		payload['pageNo'] = pagination.current
		payload['pageSize'] = pagination.pageSize
	  }
	  dispatch({ type: 'query', payload })

	}}
```

- 普通input search
```tsx
type filterDropdown = Extract<TableColumnType<unknown>['filterDropdown'], Function>
type searchParams = { style?: CSSProperties }
function Search({ style, selectedKeys, setSelectedKeys, confirm }: searchParams & Parameters<filterDropdown>[0]) {
  return <Fragment>
    {/* {JSON.stringify(visible)} */}
    <Input.Search
      style={style ?? { width: 150 }} size='small'
      allowClear
      value={selectedKeys[0]}
      onChange={e => {
        const val = e.target.value
        setSelectedKeys(val ? [val] : [])
        if (!val) {
          confirm();
        }
      }}
      onSearch={() => {
        confirm(/* { closeDropdown: true } */);
      }} />
  </Fragment>
}

export function getColumnSearchProps(searchParams: searchParams) {
  const searchCol: TableColumnType<any> = {
    filterDropdown(args) {
      return <Search style={{ width: 120 }} {...args} {...searchParams} />
    },
    filterIcon: (_filtered: boolean) => (
      <SearchOutlined />
    ),
  }
  return searchCol as any
}
```