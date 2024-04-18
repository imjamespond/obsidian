一个正常map，另外有个单向链表记录每次插入map的node，双向链表可以从反向查询，效率更高
```ts
interface Node<T> {
  key: string
  data: T
  next: Node
  expdate: number
}

const nodeMap = {}
let curNode = null

function insert(key: string, data: T){
  next = curNode
  curNode = { key, data, next, expdate: now + 3000 }
  nodeMap[key] = curNode
}

function onExpire(){
  let node = curNode
  while ( node ) { // go through all nodes
    const {expdate, key, next} = node
    if (expdate) {
      delete nodeMap[key] 
      node.next = null
      node = next
    }
  } 
}
``` 