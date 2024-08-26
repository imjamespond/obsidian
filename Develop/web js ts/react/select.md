- 处理全部选项
```tsx
const Select = function ({ value, ...props }: SelectProps) {
  return <KmSelect {...props} value={value === undefined ? 'all' : value} />
}

<FormItem label='一级分类'>
  <Select value={params.foo} onChange={(value) => dispatch({ type: 'select', payload: { key: 'foo', value } })}>
	<Option value='all'>全部</Option>
	<Option value='1'>1</Option>
	<Option value='2'>2</Option>
  </Select>
</FormItem>

// reducer
    } else if (act.type === 'select') {
      let value: string | undefined = act.payload.value
      if (act.payload.value === 'all') {
        value = undefined
      }
      const newState: PageParams = { ...state, [act.payload.key]: value /* pageNo: 1 */ } // 跳至第1页，重置搜索
      return newState
    }
```