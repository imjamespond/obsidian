#X6 https://x6.antv.antgroup.com/tutorial/intermediate/react
PureComponent无法通过setData更新

React.PureComponent 与 React.Component 几乎完全相同，但 ==React.PureComponent 通过props和state的浅对比**来实现 shouldComponentUpate()**。==
在PureComponent中，如果包含比较复杂的数据结构，可能会因深层的数据不一致而产生错误的否定判断，导致界面得不到更新。