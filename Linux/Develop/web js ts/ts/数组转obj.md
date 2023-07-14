```ts
const ranges = useMemo(() => {
  const ranges: Obj<Obj<boolean>> = {}
  data?.authorities.forEach((item, i) => {
	const authority = ranges[item.id] ??= {}
	item.ranges?.forEach((item, i) => {
	  authority[item.code] = true
	})
  })
  return ranges
}, [data])
```

```tsx
{data?.authorities.map((item, i) => {
	const authority = ranges[item.id] ?? {}
	return (
	  <div className={styles.root} key={i}>
		<Form.Item noStyle><Checkbox>{item.dname}</Checkbox></Form.Item>
		<Form.Item noStyle name={item.id}>
		  <Checkbox.Group >
			<Row gutter={[8, 8]}>
			  {item.availableRanges?.map((item, i) => {
				return <Col lg={6} md={12} xs={24} key={i}>
				  <Checkbox value={item.code} checked={authority[item.code] === true}>{item.name}</Checkbox>
				</Col>
			  })}
			</Row>
		  </Checkbox.Group>
		</Form.Item>
		<Divider />
	  </div>
	)
})}
```