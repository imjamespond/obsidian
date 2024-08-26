```tsx

/**
 * 两边table比较
 */
type getHistoryByModelKey = KeyOfFetcher<typeof service.metadatarepo.model.getHistoryByModel>

function VersionCompare() {

  const { data: versions } = useSWR<MetadataRepo.History[], Api.ApiError, null | getHistoryByModelKey>(
    { url: 'metadatarepo.model.getHistoryByModel', args: { body: { modelName: 'Server' } } },
    service.metadatarepo.model.getHistoryByModel)

  const [src, set_src] = useState<string>()
  const [tar, set_tar] = useState<string>()

  const source = useMemo(() => {
    if (src && versions) {
      const vers = versions.filter((ver) => ver.version === src)
      if (vers.length) {
        const attrs = vers[0].metaRepoAttributes
        return attrs.map((item, i) => {
          return { ...item, __pos: i }
        })
      }
    }
  }, [src])

  const target = useMemo(() => {
    if (tar && versions) {
      const vers = versions.filter((ver) => ver.version === tar)
      if (vers.length) {
        const attrs = vers[0].metaRepoAttributes
        const target = attrs.map((item, i) => {
          return { ...item, __pos: i }
        })
        if (source) {

          const tarMap = target.reduce((prev, cur, i) => {
            prev[cur.attributeId] = cur
            return prev
          }, {} as { [k: string]: RowType })

          const _target: RowType[] = []
          source.forEach((src) => {
            const tar = tarMap[src.attributeId]
            if (tar) { // attr exist in source
              _target.push({ ...tar, __diff: getDiff(src, tar) })
              delete tarMap[src.attributeId]
            } else {
              // removed attrs
              _target.push(createAttr(src.attributeId))
            }
          })
          // new attrs left in tarMap
          Object.entries(tarMap).forEach(([_k, v]) => {
            _target.push({ ...v, __diff: true })
          })
          return _target
        }
      }
    }
  }, [tar, source])

  return <div className='__compare'>
    <Toolbar>
      <Form layout='inline'>
        <Form.Item label='源版本'>
          <KmSelect style={{ width: 250 }} onChange={(val) => set_src(val)}>
            {versions?.map((item, i) => <KmSelect.Option key={i} value={item.version}>{item.version}</KmSelect.Option>)}
          </KmSelect>
        </Form.Item>
        <Form.Item label='目标版本'>
          <KmSelect style={{ width: 250 }} onChange={(val) => set_tar(val)}>
            {versions?.map((item, i) => <KmSelect.Option key={i} value={item.version}>{item.version}</KmSelect.Option>)}
          </KmSelect>
        </Form.Item>
      </Form>
    </Toolbar>
    <Row gutter={[10, 10]}>
      <Col span={12}>
        <Table
          size='small'
          rowKey='attributeId'
          columns={cols}
          dataSource={source}
          pageSize={0} pageNum={0} total={0} maxHeight={500}
          resizeObserver
          showPagination={false}
        />
      </Col>
      <Col span={12}>
        <Table
          size='small'
          rowKey='attributeId'
          columns={cols}
          dataSource={target}
          pageSize={0} pageNum={0} total={0} maxHeight={500}
          resizeObserver
          showPagination={false}
        />
      </Col>
    </Row>
    <Debug data={{}} />
  </div>
}

type RowType = MetadataRepo.MetaRepoAttribute & { __pos: number, __diff?: true | Record<string, any> }

const render: (k: keyof RowType) => ((value: any, record: RowType, index: number) => any) = (k) => (val, record) => {
  if (record.__pos < 0)
    return null
  let text = val
  if (typeof text === 'boolean')
    text = JSON.stringify(val)
  if (k === 'type')
    text = record.type.name
  return (<Tooltip tip={(record.__diff === true || record.__diff?.[k] === true) ? <b>{text}</b> : text} defaultStyle />)
}

const cols: Columns<RowType> = [
  { dataIndex: '__pos', title: '位置', width: 50, render: render('__pos') },
  { dataIndex: 'cnName', title: '属性名称', width: 100, render: render('cnName') },
  { dataIndex: 'name', title: '属性英文名称', width: 150, render: render('name') },
  { dataIndex: 'modelName', title: '所属元模型', width: 150, render: render('modelName') },
  { dataIndex: 'describe', title: '描述', width: 150, render: render('describe') },
  { dataIndex: 'primarykey', title: '主键', width: 100, render: render('primarykey') },
  { dataIndex: 'type', title: '类型', width: 100, render: render('type') },
  { dataIndex: 'isRequired', title: '是否必填', width: 100, render: render('isRequired') },
  { dataIndex: 'builtIn', title: '是否内置', width: 100, render: render('builtIn') },
]

function createAttr(attributeId: string): RowType {
  return {
    name: '',
    type: {
      name: ''
    },
    isRequired: false,
    isId: false,
    readonly: false,
    hash: false,
    cnName: '',
    order: 0,
    theme: '',
    textarea: false,
    attributeId,
    modelName: '',
    parentId: '',
    namePath: '',
    primarykey: false,
    builtIn: false,
    hide: false,
    displayed: false,
    id: false,
    required: false,

    __pos: -1,
    __diff: undefined
  }
}

function getDiff(src: any, tar: any) {
  const diff: any = {}
  for (const k in src) {
    const sv = src[k], tv = tar[k]
    if (typeof sv === 'object' || typeof tv === 'object') {
      diff[k] = stableHash(sv) !== stableHash(tv)
    } else {
      diff[k] = sv !== tv
    }
  }
  return diff
}
```