```js
const arr = [1, 2, 3, 4, 5];

const len = arr.length

for(let i=0;i<len;i++){
  const arr1 = [...arr]
  // 从索引 2 删除 1 个元素
  const removedElement = arr1.splice(2, 1);
  // 将已删除的元素插入到索引 4 处
  arr1.splice(i, 0, removedElement[0]);
  console.log(i, arr1); 
}

```

```
> 0 Array [3, 1, 2, 4, 5]
> 1 Array [1, 3, 2, 4, 5]
> 2 Array [1, 2, 3, 4, 5]
> 3 Array [1, 2, 4, 3, 5]
> 4 Array [1, 2, 4, 5, 3]
```