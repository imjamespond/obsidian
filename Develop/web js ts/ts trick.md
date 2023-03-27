### ts反射数据类型
swagger中复制样例数据
asessmentResult.json
```
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
```
import asessmentResult from './asessmentResult.json'

export type assesmentType = typeof assesment
```

---
