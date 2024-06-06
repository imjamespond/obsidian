
- 光标后插入字串
```ts
const selectionStart = inputRef.current?.resizableTextArea?.textArea.selectionStart ?? 0
if (typeof selectionStart === 'number') {
  const startStr = msgContent.slice(0, selectionStart)
  const endStr =  msgContent.slice(selectionStart)
  form.setFieldsValue({ msgContent: `${startStr} {${item.cnName}}${endStr}` })
}
```