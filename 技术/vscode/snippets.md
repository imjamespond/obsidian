#snipnets #vscode
- ### snippets 
`~/Library/Application Support/Code/User/snippets/typescriptreact.json`
```json
{
  // Place your snippets for typescriptreact here. Each snippet is defined under a snippet name and has a prefix, body and 
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
  // same ids are connected.
  // Example:
  "Print to console": {
    "prefix": "log",
    "body": [
      "console.log('$1');",
      "$2"
    ],
    "description": "Log output to console"
  },
  "fc": {
    "prefix": "fc",
    "body": [
      "import React from 'react';",
      "",
      "function FC() {",
      "  return (",
      "    <React.Fragment>fc${0}</React.Fragment>",
      "  )",
      "}",
      "",
      "export default FC"
    ]
  },
  "swr": {
    "prefix": "swr",
    "body": [
      "import useSWR from 'swr';"
    ],
    "description": "useSWR"
  },
  "useMutation": {
    "prefix": "useMutation",
    "body": [
      "import useMutation from 'swr/mutation';"
    ],
    "description": "useMutation"
  },
  "useStyles": {
    "prefix": "useStyles",
    "body": [
      "const useStyles = createUseStyles({",
      "  root:{",
      "  }",
      "})"
    ]
  },
  "act": {
    "prefix": "Act",
    "body": [
      "export enum ActType { Add, Edit }",
      "export type Act = { type: ActType.Add, payload?: undefined } | { type: ActType.Edit, payload: Payload }",
      "const [act, set_act] = useState<Act>()"
    ],
    "description": "Act, ActType"
  },
  "reduce": {
    "prefix": "useReduce",
    "body": [
      "export type ReducerType = Misc.Prettier<Exclude<someKey['args']['params'], undefined>>",
      "export interface IAct<A, T> { type: A, payload: T }",
      "const reducer: React.Reducer<\n  ReducerType,\n  IAct<'query', ReducerType> | IAct<'page', ReducerType> \n> = (\n  state, act\n) => {",
      "    if (act.type === 'query') {\n      const newState: ReducerType = { ...state, ...act.payload, pageNo: 1 }\n      return newState",
      "    } else if (act.type === 'page') {\n      const newState: ReducerType = { ...state, ...act.payload, }\n      return newState\n    }\n    return state\n  }",
      "  const [page] = usePage()\n  const [params, dispatch] = useReducer(reducer, { pageNo: page.pageNum, pageSize: page.pageSize })"
    ],
    "description": ""
  },
}
```
