nested form的input的id不能和外层form input id重复，因此要改名，详见！！！important注解
```tsx
import { KmButton, KmEmpty, KmInput, KmModal, KmSelect, KmSpace, KmSpin, SpaceCenter, TextCenter } from '@components';
import { Form, } from 'antd';
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Table, { Columns, ResizableTitle } from '@components/Table';
import { AddBtn, CancelBtn, SaveBtn } from '@components/button';
import Debug from '@components/debug';
import { formCfg, modalWidthLg } from '@config';
import { MinBox as Box } from '@components/box';
import { getFormRelation } from '../subject/form';
import { nanoid } from 'nanoid';
import { DataTypes, useConcept, useDatatypes, useTreeNode } from '../../config';
import useMutation from 'swr/mutation';
import { service } from '@service';
import { useTryCatch } from '@commons/hooks';
import { Act, ActType, RowType } from './list';
import { useMsg } from '@commons/context';

type Props = { state: Datamodeler.Logical.State | undefined, act?: Act, onClose: Function, onUpdate: Function }
type Attr = Datamodeler.Logical.EasyDataModelerLogicalDataModelAttribute


const { Item } = Form

function FC({ state, act, onClose, onUpdate }: Props) {

  const model = useTreeNode()

  const msg = useMsg()

  const [form] = Form.useForm()
  const [fields, set_fields] = useState<Attr[]>()
  const [disabled, set_disabled] = useState(false)

  const { data: concept, isLoading: isLoadingCc } = useConcept({ conceptId: model?.id })

  const { data: datatypes, isLoading: isLoadingDT } = useDatatypes()

  const { trigger: save, isMutating: saving } = useMutation('datamodeler.saveLogicalDataModel', service.datamodeler.saveLogicalDataModel)
  const [saveFn] = useTryCatch(save, [])


  useEffect(() => {
    if (act?.type === ActType.Edit) {
      form.setFieldsValue(act.payload)
    } else {
      form.resetFields()
    }
  }, [act])

  // FIXME 
  const logiclModels: RowType[] = []
  const formRelation = useMemo(() => getFormRelation({ id: act?.payload?.id, cnName: '逻辑模型', name: 'neighboringConcepts', itemName: 'concept', type: 2, items: logiclModels }), [act, logiclModels])

  const loading = isLoadingCc || isLoadingDT || state === undefined
  const hasDatatypes = (datatypes && datatypes?.length)

  const ctx = useRef<FormTableRef>(null)

  return (
    <React.Fragment>
      <Form className='form-item-mb1' form={form} size='small' {...formCfg.lg}
        initialValues={process.env.devMode ? { name: 'foobar', remark: 'this is foobar' } : undefined}
        onFinish={async (values) => {
          const logicalModel: RowType = {
            ...values,
            concept,
            easyDataModelerLogicalDataModelAttributes: fields,
            state
          }
          const rs = await saveFn(logicalModel)
          if (rs) {
            msg.success('保存成功！')
            onClose()
            onUpdate()
          }
        }}
      >

        <Item label='所属概念模型'>
          {loading ? <KmSpin /> : <KmInput disabled value={`${concept?.theme.cnName}/${concept?.cnName}`} />}
        </Item>
        <Item label='模型名称' name='name' required>
          <KmInput />
        </Item>
        <Item label='模型描述' name='remark'>
          <KmInput.TextArea rows={3} />
        </Item>

        <Item label='属性'>
          <KmSpace>
            <AddBtn type='dashed' disabled={!hasDatatypes}
              onClick={() => {
                if (hasDatatypes) {
                  const datatype = datatypes[0]
                  set_fields(prev => {
                    const field: Attr = process.env.devMode ? {
                      cnName: 'foo',
                      datatype,
                      iid: nanoid(),
                      name: 'foo',
                      remark: 'bar'
                    } : {
                      cnName: '',
                      datatype,
                      iid: nanoid(),
                      name: '',
                      remark: ''
                    }
                    const list = prev ?? []
                    // ctx.current?.setEditRow([field, list.length])
                    return [...list, field]
                  })
                }
              }}
              loading={loading}
            >新增字段 </AddBtn>
            <AddBtn type='dashed' loading={loading}>新增外键 </AddBtn>
          </KmSpace>
        </Item>

        <FormTable
          data={fields}
          setData={(data: EditRow) => set_fields(prev => {
            if (prev) {
              const list = [...prev]
              list.splice(data[1], 1, data[0])
              return list
            }
          })}
          rmData={(start: number) => set_fields(prev => {
            if (prev) {
              const list = [...prev]
              list.splice(start, 1)
              return list
            }
          })}
          setDisabled={(val: boolean) => set_disabled(val)}
          ref={ctx}
        />

        {/* {formRelation} */}

        <SpaceCenter>
          <CancelBtn onClick={() => onClose()} />
          <SaveBtn htmlType='submit' disabled={disabled} />
        </SpaceCenter>

        {process.env.devMode && 1 && <Item noStyle shouldUpdate>
          {() => (<Debug data={{ form: form.getFieldsValue(), fields }} />)}
        </Item>}
      </Form>
    </React.Fragment>
  )
}

export default function (props: Props) {
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
  >
    <Box >
      <FC {...props} />
    </Box>
  </KmModal>
}

type EditRow = [Attr, number]
type FormTableRef = { /* setEditRow(editRow: EditRow): void, */ }

const FormTable = React.forwardRef<
  FormTableRef, { data?: Attr[], setData: Function, rmData: Function, setDisabled: Function }
>(function ({ data, setData, rmData, setDisabled }, ref) {

  const [form] = Form.useForm()

  const [editRow, setRow] = useState<EditRow>()

  const { data: datatypes, isLoading } = useDatatypes()

  useImperativeHandle<FormTableRef, FormTableRef>(ref, () => {
    return {
      // setEditRow: (editRow: EditRow) => {
      //   setRow(editRow)
      // }
    }
  }, [])

  const confirm = (i: number) => {
    const { _name, _remark, ...values } = form.getFieldsValue()
    const datatype = datatypes?.find(item => item.name === values?.datatype?.name)
    if (datatype && editRow) {
      const [origin] = editRow
      const attr: Attr = { ...origin, ...values, datatype, name: _name, remark: _remark } // read form !!!important
      setData([attr, i])
      setRow(undefined)
    }
  }

  const cols = useMemo(() => {
    return getCols(
      (rec, i) => {
        setRow([rec, i])
      },
      (i) => {
        confirm(i)
      },
      () => {
        setRow(undefined)
      },
      (i) => {
        rmData(i)
        setRow(undefined)
      },
      editRow, datatypes
    )
  }, [editRow, datatypes])

  // data变动自动编辑
  const dataLen = useRef(0)
  useEffect(() => {
    if (data?.length && data.length > dataLen.current) {
      const i = data.length - 1
      setRow([data[i], i])
    }
    dataLen.current = data?.length ?? 0
  }, [data])

  useEffect(() => {
    if (editRow) {
      form.setFieldsValue({ ...editRow[0], _name: editRow[0].name, _remark: editRow[0].remark }) // set form !!!important
    } else {
      form.resetFields()
    }
    setDisabled(!!editRow)
  }, [editRow])


  return (
    <Form form={form} component={false} >
      <Table
        className='edit-table'
        size='small'
        resizeObserver
        loading={isLoading}
        rowKey={'iid'}
        showPagination={false}
        style={{ marginBottom: 20, minHeight: 150 }}
        columns={cols}
        dataSource={data}
        maxHeight={300} pageSize={999} pageNum={1} total={data?.length ?? 0}
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
                  // confirm(editRow[1])
                  setRow(undefined)
                }
              } else {
                if (typeof index === 'number') { // 点击编辑行
                  setRow([record, index])
                }
              }
            },
            onKeyDown: (e) => index !== undefined && e.code === 'Enter' && confirm(index),
            className: editRow && editRow[1] === index ? 'edit-row' : 'read-row'
          }
        }}
      />
      {process.env.devMode && 1 && <Form.Item noStyle shouldUpdate>
        {() => JSON.stringify({ form: form.getFieldsValue() })}
      </Form.Item>}
    </Form>
  )
})

export const columns: Columns<Attr> = [
  {
    title: '英文名', dataIndex: 'name',
  },
  {
    dataIndex: 'cnName', title: '中文名'
  },
  { dataIndex: 'remark', title: '业务含义' },
  { dataIndex: 'datatype', title: '类型' },
  { dataIndex: 'name1' as any, title: '主键' },
  { dataIndex: 'name2' as any, title: '外键' },
  { dataIndex: 'name3' as any, title: '标准' },
]

export const getCols: (
  edit: (rec: Attr, i: number) => void,
  confirm: (i: number) => void,
  cancel: () => void,
  del: (i: number) => void,
  row?: EditRow,
  dataTypes?: DataTypes
) => Columns<Attr> = (edit, confirm, cancel, del, row, dataTypes) => (
  [
    {
      title: '序号',
      width: 50,
      onCell: (_rec, rowIndex) => ({ title: '', cellKey: 'index', render: () => (rowIndex ?? 0) + 1 })
    },
    ...columns.map(col => (
      {
        ...col,
        onCell: (rec, rowIndex) => ({
          title: col.title,
          cellKey: col.dataIndex,
          render: () => {
            if (col.dataIndex) {
              const dataIndex = (() => {
                if (col.dataIndex === 'name') return '_name' // avoid conflict with input in parent form which has the same 'name' !!!important
                if (col.dataIndex === 'remark') return '_remark'
                return col.dataIndex
              })()
              // edit mode
              if (row && rowIndex === row[1]) {
                // 下拉框
                if (col.dataIndex === 'datatype') {
                  return (
                    <Form.Item
                      name={[col.dataIndex, 'name']}
                      noStyle
                    >
                      <KmSelect className='w-100' >
                        {dataTypes?.map((item) => <KmSelect.Option key={item.name} value={item.name}>{item.cnName}</KmSelect.Option>)}
                      </KmSelect>
                    </Form.Item>
                  )
                }
                // 文本框
                return (
                  <Form.Item
                    name={dataIndex}
                    noStyle
                  >
                    <KmInput/>
                  </Form.Item>
                )
              }
              // read mode 
              else {
                const text = (()=>{
                  if (col.dataIndex === 'datatype') {
                    return rec?.datatype?.cnName
                  }
                  return rec?.[col.dataIndex]
                })() 
                return <span className='text'>{text}</span>
              }
            }
            return null
          }
        })
      })) as Columns<Attr>,
    {
      title: <TextCenter>操作</TextCenter>,
      width: 120,
      onCell: (rec, rowIndex) => ({
        title: '',
        cellKey: 'oper',
        render: () => {
          if (row && rowIndex === row[1]) {
            return <TextCenter>
              <KmButton type='link' size='small' onClick={() => {
                confirm(rowIndex)
              }}>确定</KmButton>
              <KmButton type='link' size='small' onClick={() => {
                cancel()
              }}>取消</KmButton>
            </TextCenter>
          }
          return <TextCenter>
            <KmButton type='link' size='small' onClick={(e) => {
              e.stopPropagation()
              rowIndex !== undefined && edit(rec, rowIndex)
            }}>修改</KmButton>
            <KmButton type='link' size='small' danger onClick={(e) => {
              e.stopPropagation()
              rowIndex !== undefined && del(rowIndex)
            }}>删除</KmButton>
          </TextCenter>
        }
      })

    }
  ]
)


const EditableCell: React.FC<{ cellKey: string, colSpan?: number, render?: Function }> = ({
  cellKey, colSpan, render
}) => {
  let content = null
  if (colSpan) {
    return <td key={cellKey} colSpan={colSpan}><KmEmpty /></td>
  }
  if (render) {
    content = render()
  }
  return <td key={cellKey}>{content}</td>
}
```