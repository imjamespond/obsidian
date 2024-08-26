```jsx
import { DataNode } from "antd/es/tree";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from 'throttle-debounce'

type stateType = ReturnType<typeof useState<React.Key[]>>

export function useTreeSearch<T extends DataNode>(dataNodes: T[] | undefined, getStr: (item: T) => string) {

  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const setSearchValueFn = useCallback(debounce(500, (value: string) => setSearchValue(value)), [])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValueFn(e.target.value)
  }

  /**
   * 展开
   * @param newExpandedKeys 
   */
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false); // 手动展开禁止其它节点父节点自动展开, 防止expandedKeys被篡改
  };

  /**
   * @description 搜索值变化
   */
  useEffect(() => {
    const value = searchValue
    const newExpandedKeys: React.Key[] = []
    const doMatch = (dataNodes?: DataNode[]) => {
      return dataNodes?.some((item) => {
        if (doMatch(item.children)) {
          newExpandedKeys.push(item.key) // 展开父节点
        }
        if (getStr(item as T).indexOf(value) > -1) { // 子节点匹配
          // console.debug('matched:',item.key)
          return true
        }
      })
    }
    if (value) {
      doMatch(dataNodes)
    }
    if (newExpandedKeys.length) {
      setExpandedKeys(newExpandedKeys);
      setAutoExpandParent(true);
    }
  }, [searchValue, dataNodes])

  /**
   * tree 的treeData
   */
  const treeData = useMemo(() => {

    const loop = (dataNodes: DataNode[]): DataNode[] => (

      dataNodes?.map(item => {

        const title = getTitle(item.title as string, searchValue) ?? item.title
        if (item.children) {
          return {
            ...item, title, children: loop(item.children)
          };
        }

        return item;
      }))

    if (dataNodes)
      return loop(dataNodes);

  }, [searchValue, dataNodes]);

  return {
    onChange,
    onExpand,
    selectedKeys, setSelectedKeys,
    expandedKeys, setExpandedKeys,
    searchValue, setSearchValue,
    autoExpandParent, setAutoExpandParent,
    treeData
  }
}


function getTitle(strTitle: string | null, searchValue: string) {
  if (strTitle) {
    const index = strTitle.indexOf(searchValue);
    const beforeStr = strTitle.substring(0, index);
    const afterStr = strTitle.slice(index + searchValue.length);
    const title =
      index > -1 ? (
        <span>
          {beforeStr}
          <span className="__highlight">{searchValue}</span>
          {afterStr}
        </span>
      ) : undefined
    return title
  }
  return ''
}

export function generateSampleData() {
  const layers = [50, 6, 7, 8, 9]
  const generate = (lv: number, pid: string) => {
    if (lv < layers.length) {
      return new Array(layers[lv]).fill(0).map((_, i): DataNode => {
        const id = `${pid}-${i}`;
        return ({ key: id, title: id, children: generate(lv + 1, id) });
      })
    }
  }
  return generate(0, '0')
}

export function useTreeHelper<NodeData>({ keys, treeNode, setSelectedKeys, setExpandedKeys }: {
  setSelectedKeys: stateType[1]
  setExpandedKeys: stateType[1]
  keys?: stateType[0]
  treeNode?: NodeData
}) {


  const [curTreeNode, setCurTreeNode] = useState<NodeData>()

  useEffect(() => { // 默认展开
    if (treeNode && keys) {
      setSelectedKeys(prev => {

        if (prev && prev.length) { // 若已经展开则return
          return prev
        }

        setExpandedKeys(keys)
        setCurTreeNode(treeNode)
        // ctx.setState?.({ treeNode }) //Cannot update a component (`FC`) while rendering a different component (`FC`)

        return keys
      })
    }
  }, [treeNode, keys])

  return { curTreeNode, setCurTreeNode }
}
```