- ### sub属性未export
`TableProps<any>['columns']`, 这样dataIndex将有类型提示
```ts
export type Columns<T> = (Omit<TableColumnType<T>, 'dataIndex'> & { dataIndex?: keyof T })[]
// export type Columns<T> = (Omit<ListOf<TableProps<T>['columns']>, 'dataIndex'> & { dataIndex: keyof T })[]

type SampleItem = Sample['item'] 
const colsSafety: Columns<SampleItem> = [
  { 
    title: '报告名称',
    dataIndex: 'reportName',
  }
]
```

--- 
- ### ts反射数据类型
swagger中复制样例数据
asessmentResult.json
```json
[
    {
      "createdTS": 0,
      "desc": "string",
      "id": 0,
      "name": "string",
      "number": "string",
      "period": "string",
      "resultData": {
        "deptList": [
          {
            "deptName": "string",
            "orgName": "string",
            "score": 0
          }
        ],
        "orgList": [
          {
            "orgName": "string",
            "score": 0
          }
        ]
      },
      "resultDataJson": "string"
    }
]
```
types.ts
```ts
import asessmentResult from './asessmentResult.json'
export type assesmentType = typeof assesment
```

---
