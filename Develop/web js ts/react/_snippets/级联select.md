```tsx
  const [selIds, setSelIds] = useState<string[]>();
  const subCatalogs = useMemo(() => {
    const selectList: React.ReactNode[] = [];
    const getSubCatalogs = (catalog: Catalog, pos: number) => {
      const options: SelectProps['options'] | undefined =
        catalog.subCatalogs?.map((child) => {
          // go deeper
          if (selIds?.length && selIds.length > pos) {
            const id = selIds[pos];
            if (id === child.id) {
              getSubCatalogs(child, pos + 1);
            }
          }
          return { label: child.cnName, value: child.id };
        });
      options.length &&
        selectList.unshift(
          <KmSelect
            key={catalog.id}
            options={options}
            style={{ width }}
            onChange={(val) => {
              setSelIds((prev) => {
                const ids = prev ? prev.slice(0, pos + 1) : ['null'];
                ids[pos] = val;
                return ids;
              });
            }}
          />
        );
    };
    data && getSubCatalogs(data, 0);
    return selectList;
  }, [data, selIds]);
```

```
print ids
[
  "6213698166cd7521b4e6963d",
  "6213698266cd7521b4e69642",
  "642a87d1a29c851771cbdfb5",
  "642a87d5a29c851771cbdfb9"
]
```

```ts
// 截取并设置当前层级选中的id
const ids = prev ? prev.slice(0, pos + 1) : ['null'];
ids[pos] = val;
```

_@param_ `end`  
The end index of the specified portion of the array. ==This is **exclusive** of the element at the index 'end'.== If end is undefined, then the slice extends **to the end** of the array.