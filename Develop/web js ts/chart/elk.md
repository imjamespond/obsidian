### `'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',`
```js
  const data = {
    "id": "__root__",
    "children": [/* { "id": "1111" }, */ { "id": "2222" }, { "id": "33333" }, /* { "id": "4444" }, { "id": "55555" } */],
    "edges": [
      { "id": "2222-33333", "sources": ["2222"], "targets": ["33333"] },
      // { "id": "33333-4444", "sources": ["33333"], "targets": ["4444"] },
      // { "id": "33333-55555", "sources": ["33333"], "targets": ["55555"] },
      // { "id": "1111-2222", "sources": ["1111"], "targets": ["2222"] },
      { "id": "2222-2222", "sources": ["2222"], "targets": ["2222"] }
    ]
  }
```

这样会出导致layout java。util。nosuchelement错