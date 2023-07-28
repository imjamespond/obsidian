
```ts
  const setUpadteItems = useCallback<typeof setItems>((act) => {
    setItems(prev => {
      if (typeof act === 'function') {
        const newVal = act(prev)
        // updateItems?.(newVal)
        return newVal
      }
      // updateItems?.(act) // Cannot update a component (`FC`) while rendering a different component (`Sortable`).
      return act
    })
  }, [])
```