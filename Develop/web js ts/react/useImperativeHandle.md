
- TriggerOfMutationFetcher 推断trigger的类型
```ts
export type TriggerOfMutationFetcher<T> = T extends MutationFetcher<infer Data, infer ExtraArg> ? SWRMutationResponse<Data, unknown, ExtraArg>['trigger'] : never
```

- 
```tsx
import { KeyOfFetcher, TriggerOfMutationFetcher, service } from '@service';
import { Checkbox, Col, Form, Row, Divider } from 'antd';
import React, { Fragment, forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import useSWR from 'swr';
import { Spin, } from '@components'
import { createUseStyles } from 'react-jss';
import { Obj } from '@commons/misc';
import produce from 'immer'
import { useMsg, useTryCatch } from '@commons/hooks';

type dataRoleDetailKey = KeyOfFetcher<typeof service.authservice.dataRolesDetail>
type dataRolesPostTrigger = TriggerOfMutationFetcher<typeof service.authservice.dataRolesPost>
type FormType = { authorities: Obj<boolean>, ranges: Obj<number[]> }

export type Handler = { callDataRoleSave: Function } // 由外部调用

const FC = forwardRef<Handler, { role: AuthService.DataRole, dataRoleSave: dataRolesPostTrigger /* 外部传入trigger以便填充参数 */ }>(

  function ({ role, dataRoleSave }, ref) {

    const msg = useMsg()

    const styles = useStyles()

    const [form] = Form.useForm<FormType>()

    const { data, isLoading, isValidating } = useSWR<AuthService.DataRoleDetail, Api.Error, dataRoleDetailKey | null>(
      role ? {
        url: 'authservice.dataRoleDetail', args: { roleId: role.id }
      } : null, service.authservice.dataRolesDetail)


    useEffect(() => {
      if (data) {
        const formData: FormType = {
          authorities: {},
          ranges: {}
        }
        data.authorities.forEach((item) => {
          formData.authorities[item.name] = item.enabled
          formData.ranges[item.name] = item.ranges?.map(item => item.code) ?? []
        })
        form.setFieldsValue(formData)
      }
    }, [data])

    const [callDataRoleSave] = useTryCatch(async () => {
      if (data && role) {
        await form.validateFields()
        const formData = form.getFieldsValue()
        const newData = produce(data, draft => {
          draft?.authorities.forEach(item => {
            item.enabled = !!formData.authorities[item.name]
            const availableRanges = item.availableRanges // 通过code从availableRanges获取完整obj
            if (availableRanges) {
              item.ranges = formData.ranges[item.name]?.map((code) => { // 勾选的code
                const i = availableRanges.findIndex(item => item.code === code)
                return availableRanges[i] // code object
              })
            }
          })
        })
        await dataRoleSave({ roleId: role.id, body: newData })
        msg.success('保存成功')
      }
    }, [data, role])

    useImperativeHandle(ref, () => {
      return {
        callDataRoleSave
      }
    }, [callDataRoleSave])

    const spinning = isLoading || isValidating

    return (
      <Spin spinning={spinning}>
        {/* {JSON.stringify({ ranges })} */}
        <Form
          form={form}
          onValuesChange={(vals) => {
            // 级联 操作 所有子选项 
            const authorities = vals.authorities as FormType['authorities']
            if (authorities && data) {
              Object.entries(authorities).forEach(([k, v]) => {
                const i = data.authorities.findIndex(item => item.name === k)
                const availableRanges = data.authorities[i].availableRanges
                if (i >= 0 && availableRanges) {
                  form.setFieldValue(['ranges', k], v ? availableRanges.map(item => item.code) : [])
                }
              })
            }
          }}
        >

          {data?.authorities.map((item, i) => {
            return (
              <div className={styles.root} key={i}>
                <Form.Item noStyle name={['authorities', item.name]} valuePropName="checked"><Checkbox value={item.id}>{item.dname}</Checkbox></Form.Item>
                <Form.Item noStyle name={['ranges', item.name]}>
                  <Checkbox.Group >
                    <Row gutter={[8, 8]}>
                      {item.availableRanges?.map((item, i) => {
                        return (
                          <Col lg={6} md={12} xs={24} key={i}>
                            <Checkbox value={item.code}>{item.name}</Checkbox>
                          </Col>
                        )
                      })}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <Divider />
              </div>
            )
          })}
        </Form>
      </Spin>
    )
  }
)

export default FC

const useStyles = createUseStyles({
  root: {
    '& .group': {
      padding: '0px 10px'
    }
  },
  '@global': {
    'body $root': {
      '& .km-checkbox-group': {
        display: 'block',
        paddingTop: 20,
        paddingLeft: 50
      },

    }
  }
})
```