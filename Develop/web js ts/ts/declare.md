#levenshtein #test #declare #karma

[阮一峰《TypeScript 教程》](https://www.bookstack.cn/books/wangdoc-typescript-tutorial "阮一峰《TypeScript 教程》")

- #### module
src/commons/levenshtein.d.ts
```ts
declare function levenshtein(str1: string, str2: string): number;

declare module "@commons/levenshtein" {
  export default levenshtein;
}
```
src/test/levenshtein.ts
```ts
import lv from "@commons/levenshtein";

const levenshtein: typeof lv = (str1, str2)=>{
  const dist = lv(str1,str2)
  console.log(str1, str2, dist);
  return dist
}

export default function test(){
  levenshtein('a', 'b')
  levenshtein('abc', 'axc')
  levenshtein('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文')
  levenshtein('你好', '我是中國人')
  levenshtein('sturgeon', 'urgently')
  levenshtein('distance', 'difference')
}
```

karma js
```js
import levenshtein from '@/test/levenshtein'
describe('levenshtein.test', () => {
  it('should be OK', () => { 
    levenshtein()
  })
})
```


```
LOG: 'a', 'b', 1
LOG: 'abc', 'axc', 1
LOG: '因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文', 2
LOG: '你好', '我是中國人', 5
LOG: 'sturgeon', 'urgently', 6
LOG: 'distance', 'difference', 5
```