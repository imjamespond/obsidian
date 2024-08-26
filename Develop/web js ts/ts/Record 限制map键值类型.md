```ts
export const schemaTypes = <const>['ods', 'dwd', 'dws', 'ads', 'dim',]
type schemaTypesKeys = typeof schemaTypes[number]
export type schemaLayer = { name: string, style: { backgroundColor: string } }
// export const schemaLayers: { [key in schemaTypesKeys]: schemaLayer} = {
export const schemaLayers: Record<schemaTypesKeys, schemaLayer> = {
  'ods': { name: '贴源层', style: { backgroundColor: '#f8c37f' } },
  'dwd': { name: '明细层', style: { backgroundColor: '#cecece' } },
  'dws': { name: '汇总', style: { backgroundColor: '#9a9a9a' } },
  'ads': { name: '应用', style: { backgroundColor: '#71c9f6' } },
  'dim': { name: 'DIM层', style: { backgroundColor: '#c0fc6f' } }, 
}
```