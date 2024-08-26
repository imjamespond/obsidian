```ts
 const [variableReplacements, set_variableReplacements] = useState<Misc.Obj<string>>()
  const [variableNames, set_variableNames] = useState<string[]>()
  const [varRow, set_varRow] = useState<[VarRow, number]>() // 编辑行
  const vars = useMemo(() => {
    return (variableNames ?? []).map((k) => {
      return { k, v: variableReplacements?.[k] }
    })
  }, [variableNames, variableReplacements])
  const addVar = useCallback((row: VarRow) => {
    const { k, v } = row
    const setVariableNames = () => {
      set_variableNames(prevKeys => {
        let names = prevKeys ? [...prevKeys, k] : [k]
        set_varRow([row, names.length - 1])
        return names
      })
    }
    set_variableReplacements(prev => {
      if (prev) {
        if (prev[k] === undefined) {
          setVariableNames()
          return { ...prev, [k]: v! }
        }
        return prev // 已存在key
      }
      setVariableNames()
      return { [k]: v! }
    })
  }, [])
  const updateVar = useCallback((row: VarRow, index: number) => {
    set_variableNames(prev => { // update fields
      if (prev) {
        const list = [...prev]
        const prevKey = list[index]// prev key
        set_variableReplacements(prevObj => {
          if (prevObj) {
            const newObj = { ...prevObj }
            if (prevKey !== row.k) {
              if (prevObj[row.k] === undefined) { //obj中new key不存在
                list.splice(index, 1, row.k) // remove and add to list
                delete newObj[prevKey] // remove from obj
                return { ...newObj, [row.k]: row.v! } // add to obj
              }
            } else { // key 没变
              return { ...newObj, [row.k]: row.v! } // add to obj
            }
          }
          return prevObj
        })
        return list
      }
      return prev
    })
  }, [])
  const delVar = useCallback((index: number) => {
    set_variableNames(prevKeys => {
      const list = [...prevKeys!]
      const removed = list.splice(index, 1)
      set_variableReplacements(prev => {
        if (prev) {
          const newObj = { ...prev }
          delete newObj[removed[0]]
          return { ...newObj, }
        }
        return prev
      })
      return list
    })
  }, [])
  useEffect(() => {
    if (varRow) {
      varForm.setFieldsValue(varRow[0])
    }
  }, [varRow])
```