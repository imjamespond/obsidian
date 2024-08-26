```tsx
import { Flex, KmButton, KmCard, KmCol, KmEmpty, KmInput, KmInputNumber, KmList, KmPopover, KmRow, KmSelect, KmSwitch, TextCenter } from '@components';
import Table, { Columns, ResizableTitle } from '@components/Table';
import React, { Fragment, useCallback, useDeferredValue, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { useDatatypes } from '../../../config';
import modelImg from '../../../../assets/model.png'
import { Form, FormInstance } from 'antd';
import { useMsg } from '@commons/context';
import { Tooltip } from '@components/Tooltip';
import useSWR from 'swr';
import { KeyOfFetcher, service } from '@service';
import { useTreeNode } from '@/view/szse-entmodel/entmodel/config';
import { EditableCell } from './col';
import { Attribute, useAttrStore } from '../helper';
import { CancelBtn, DelBtn, EditBtn, OkBtn } from '@components/button';

type key = KeyOfFetcher<typeof service.datamodeler.getLogicalPrimaryKeys>
type FKColsMap = Record<string, Record<string, RowType | undefined> | undefined>
type RefTable = Datamodeler.Logical.EasyDataModelerLogicalPrimaryKey
type ForeignKey = Datamodeler.Logical.EasyDataModelerLogicalDataModelForeignKey

export type FKFormRef = { getFKCols(): ForeignKey[], }

const size = 'small'

export const FKForm = React.forwardRef<
  FKFormRef, {}
>(function ({ }, ref) {

  const msg = useMsg()

  const treeNode = useTreeNode()

  const [form] = Form.useForm()

  const [active, setActive] = useState<number>()

  const [filter, setFilter] = useState(false)

  const [keyword, set_keyword] = useState('')

  const [dirty, set_dirty] = useState(0)

  const [editRow, setEditRow] = useState<EditRow>()

  const fkColsMap = useRef<FKColsMap>({}) // refTableId=>pkId=>

  const { data: refTables } = useSWR(treeNode?.id ? { url: 'getLogicalPrimaryKeys', args: { params: { conceptId: treeNode.id } } } as key : null, service.datamodeler.getLogicalPrimaryKeys)

  const refTable = typeof active === 'number' && refTables ? refTables[active] : undefined

  const setDirty = () => set_dirty(prev => ++prev)

  const getColsMap = useCallback((refTableId: string, autoFill = false) => {
    if (autoFill) fkColsMap.current[refTableId] ??= {}
    return fkColsMap.current[refTableId]
  }, [])

  /**
   * 检测attr是否存在
   * @returns 
   */
  const checkAttr = useCallback((colsMap: Record<string, RowType | undefined>, pkId: string, attrId: string, attrs?: Attribute[]) => {
    const attr = attrs?.find(item => attrId === item.iid)
    if (attr === undefined) {
      console.error('attr not existed', attrId)
      msg.error('字段不存在')
      delete colsMap[pkId]
    }
    return attr
  }, [])

  /**
   * 延时过滤
   */
  const dfKeyword = useDeferredValue(keyword);
  const _refTables = useMemo(() => {
    return refTables
      ?.filter(item => {
        if (filter) {
          return getColsMap(item.owner.id) !== undefined
        }
        return true
      })
      ?.filter(item => {
        if (dfKeyword) {
          return (
            item.owner.cnName.toLowerCase().indexOf(dfKeyword) >= 0 ||
            item.owner.name.toLowerCase().indexOf(dfKeyword) >= 0
          )
        }
        return true
      })
  }, [refTables, filter, dfKeyword, dirty])

  /**
   * 右侧行
   */
  const refCols = useMemo(() => {
    if (refTable) {
      const colsMap = getColsMap(refTable.owner.id)
      return refTable.keys.map((k) => {
        const col = colsMap ? colsMap[k.name] : undefined
        const row: RowType = {
          col: col?.col,
          attr: col?.attr,
          refCol: k.cnName,
          refColType: k.datatype.cnName,
          pkId: k.name // pkId
        }
        return row
      })
    }
  }, [refTable, editRow, dirty])

  const { attrs } = useAttrStore()

  /**
   * 确认行
   */
  const confirm = (i: number) => {
    form.validateFields()
      .then(() => {
        const values = form.getFieldsValue()
        if (editRow) {
          if (refTable) {
            const colsMap = getColsMap(refTable.owner.id, true)
            if (colsMap) {
              const attr = checkAttr(colsMap, editRow[0].pkId, values.col, attrs)
              if (attr) {
                colsMap[editRow[0].pkId] = { ...editRow[0], ...values, attr }
                setEditRow(undefined)
                setDirty()
              }
            }
          }
        }
      })
      .catch((err: { errorFields?: [{ errors?: string[], name?: string[] }] }) => {
        const errMsg = err.errorFields?.reduce((prev, cur) => {
          if (cur?.name && cur?.errors) {
            return prev.concat(...cur.name, ...cur.errors, ',')
          }
          return prev
        }, '')
        msg.error(errMsg)
      })
  }

  /**
   * 编辑行
   */
  const edit = (rec: RowType, i: number) => {
    if (refTable) {
      const colsMap = getColsMap(refTable.owner.id)
      if (colsMap && rec.col) {
        const attr = checkAttr(colsMap, rec.pkId, rec.col, attrs)
        if (attr === undefined) {
          setDirty()
          return
        }
      }
    }
    if (attrs?.length) {
      setEditRow([rec, i])
    } else {
      msg.warning('请先编辑字段')
    }
  }

  /**
   * 右侧列
   */
  const cols = useMemo(() => {
    return getCols(
      edit,
      (i) => {
        confirm(i)
      },
      () => {
        setEditRow(undefined)
      },
      (i) => {
        setEditRow(undefined)
      },
      { editRow, form, getColsMap, refTable }
    )
  }, [editRow, refTable, edit])

  /**
   * 编辑行数据设置到表单
   */
  useEffect(() => {
    if (editRow) {
      form.setFieldsValue({ ...editRow[0] })
    } else {
      form.resetFields()
    }
  }, [editRow])

  /**
   * 外部 获取fk
   */
  useImperativeHandle(ref, () => {
    return {
      getFKCols() {
        const fks: ForeignKey[] = []
        refTables
          ?.forEach((table) => {
            const colsMap = getColsMap(table.owner.id)
            if (colsMap) {
              const attributes: Attribute[] = []
              table.keys
                .forEach(pk => {
                  const fkCols = colsMap[pk.name] // pkId
                  if (fkCols?.attr) {
                    attributes.push(fkCols.attr)
                  }
                })
              const fk: ForeignKey = {
                attributes,
                referencedLogicalPrimaryKey: table
              }
              fks.push(fk)
            }
          })
        return fks
      }
    }
  }, [refTables])


  return (
    <React.Fragment>
      <div style={{ margin: '0px 5px' }}>
        <KmRow gutter={[10, 10]}>
          <KmCol xs={8} xxl={6}>
            <KmCard
              className='h-100' size={size}
              title="Reference table:"
            >
              <Flex className='align-center mb-1'>
                <KmInput.Search size={size} value={keyword} onChange={e => { set_keyword(e.target.value) }} />
                <div className='ml-1'>
                  <Tooltip title={'只显示已编辑表'}><KmSwitch size={size} checked={filter} onChange={val => setFilter(val)} /></Tooltip>
                </div>
              </Flex>
              <KmList
                size={size}
                rowKey={item => item.owner.id}
                dataSource={_refTables}
                renderItem={(item, i) => (
                  <KmList.Item
                    className='pointer'
                    style={{ backgroundColor: active === i ? '#eee' : '#fff', }}
                    onClick={() => {
                      setActive(prev => {
                        if (prev === undefined || prev !== i) {
                          return i
                        }
                      })
                    }}
                    actions={getColsMap(item.owner.id) ? [<DelBtn size='small' type='link' onClick={(e) => {
                      e.stopPropagation()
                      delete fkColsMap.current[item.owner.id]
                      setDirty()
                    }}>清空</DelBtn>] : undefined}
                  >
                    <KmList.Item.Meta
                      avatar={<img src={modelImg} style={{ height: 22 }} />}
                      title={item.owner.cnName ?? item.owner.name}
                    />
                  </KmList.Item>
                )}
                pagination={{ total: refTables?.length ?? 0, pageSize: 20, size: 'small', align: 'center', hideOnSinglePage: true }}
              />
            </KmCard>
          </KmCol>
          <KmCol xs={16} xxl={18}>
            <KmCard
              title='Columns:' size={size} className='h-100'
            >
              <Form form={form} className='form-item-mb1' size='small' >
                <Table
                  className='edit-table'
                  size={size}
                  columns={cols}
                  dataSource={refCols}
                  pageSize={0} pageNum={0} total={0}
                  rowKey={'pkId'}
                  showPagination={false}
                  style={{ minHeight: 150 }}
                  resizeObserver
                  components={{
                    header: {
                      cell: ResizableTitle,
                    },
                    body: {
                      cell: EditableCell
                    }
                  }}
                  onRow={(record, index) => { // 设置行属性
                    return {
                      onClick: () => {
                        if (editRow) {
                          if (editRow[1] === index) { // 点击当前行
                            return
                          }
                          if (typeof index === 'number') { // 点击其它行, 取消
                            confirm(editRow[1])
                            // setRow(undefined)
                          }
                        } else {
                          if (typeof index === 'number') { // 点击编辑行
                            edit(record, index)
                          }
                        }
                      },
                      onKeyDown: (e) => index !== undefined && e.code === 'Enter' && confirm(index),
                      className: editRow && editRow[1] === index ? 'edit-row' : 'read-row'
                    }
                  }}
                />
              </Form>
            </KmCard>

          </KmCol>
        </KmRow>
      </div>
    </React.Fragment>
  )
})

type RowType = {
  attr?: Datamodeler.Logical.EasyDataModelerLogicalDataModelAttribute,
  refCol: string, refColType: string, pkId: string, col?: string
}
type EditRow = [RowType, number]

type ColExt = { required?: true, editable?: boolean }

export const columns: Columns<RowType, ColExt> = [
  {
    dataIndex: 'attr',
    title: 'Column',
    editable: true,
    required: true,
    render: (_, rec) => {
      return rec.attr?.cnName
    }
  },
  {
    dataIndex: 'attr',
    title: 'Column Type',
    editable: false,
    required: true,
    render: (_, rec) => {
      return rec.attr?.datatype.cnName
    }
  },
  {
    dataIndex: 'refCol',
    title: 'Ref Column'
  },
  {
    dataIndex: 'refColType',
    title: 'Ref Column Type'
  },
]

export const getCols: (
  edit: (rec: RowType, i: number) => void,
  confirm: (i: number) => void,
  cancel: () => void,
  del: (i: number) => void,
  extra: {
    editRow?: EditRow,
    form: FormInstance,
    getColsMap: (refTableId: string) => Record<string, RowType | undefined> | undefined
    refTable?: RefTable
  }
) => Columns<RowType> = (edit, confirm, cancel, del, { editRow, form, getColsMap, refTable }) => {
  return (
    [
      ...columns.map(({ required, editable, render, ...col }) => (
        {
          ...col,
          onCell: (rec, rowIndex) => ({
            title: col.title,
            cellKey: col.dataIndex,
            render: () => {
              if (col.dataIndex) {
                const dataIndex = (() => {
                  return col.dataIndex
                })()
                // edit mode
                if (editable && editRow && rowIndex === editRow[1]) {
                  return (
                    <EditRowForm
                      curRow={rec}
                      form={form} dataIndex={dataIndex} required={required} editable={editable} refTable={refTable} getColsMap={getColsMap}
                    />
                  )
                }
                // read mode 
                else {

                  if (render) {
                    return render(null, rec, 0)
                  }

                  const text = (() => {
                    return rec?.[col.dataIndex] as string
                  })()

                  return <span className='text'>{text}</span>
                }
              }
              return null
            }
          })
        })) as Columns<RowType>,
      {
        title: <TextCenter>操作</TextCenter>,
        width: 150,
        onCell: (rec, rowIndex) => ({
          title: '',
          cellKey: 'oper',
          render: () => {
            if (editRow && rowIndex === editRow[1]) {
              return <TextCenter>
                <OkBtn type='link' size='small' onClick={() => {
                  confirm(rowIndex)
                }}>确定</OkBtn>
                <CancelBtn type='link' size='small' onClick={() => {
                  cancel()
                }}>取消</CancelBtn>
              </TextCenter>
            }
            return <TextCenter>
              <EditBtn type='link' size='small' onClick={(e) => {
                e.stopPropagation()
                rowIndex !== undefined && edit(rec, rowIndex)
              }}>修改</EditBtn>
            </TextCenter>
          }
        })
      }
    ]
  )
}


function EditRowForm({ required, getColsMap, refTable, curRow }: {
  form: FormInstance, dataIndex: string,
  getColsMap: (refTableId: string) => Record<string, RowType | undefined> | undefined,
  refTable?: RefTable,
  curRow: RowType
} & ColExt) {

  const { attrs } = useAttrStore()
  const colsMap = refTable ? getColsMap(refTable.owner.id) : undefined

  return (
    <>
      {/* {JSON.stringify(attrs)} */}
      <Form.Item
        name={'col'}
        noStyle
        rules={required ? [{ message: '此项必填', required: true }] : undefined}
      >
        <KmSelect className='w-100' >
          {
            attrs
              ?.filter(attr => {
                if (attr.iid === curRow.col) { // 当前行和attr相同, 已选中
                  return true
                }
                return colsMap ? Object.entries(colsMap).some(([_k, row]) => row?.col === attr.iid) === false : true
              }) // colsMap没有attr
              ?.map((item) => <KmSelect.Option key={item.iid} value={item.iid}>{item.cnName}</KmSelect.Option>)
          }
        </KmSelect>
      </Form.Item>
    </>
  )
}

```