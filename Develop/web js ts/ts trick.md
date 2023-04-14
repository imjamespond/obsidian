- ### sub属性未export
`TableProps<any>['columns']`

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
