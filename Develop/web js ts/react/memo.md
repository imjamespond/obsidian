https://react.dev/reference/react/memo
`memo` lets you skip re-rendering a component when its props are unchanged.

React ==normally re-renders a component whenever its parent re-renders.== With memo, you can create a ==**component that React will not re-render when its parent re-renders**== so long as its new props are the same as the old props. Such a component is said to be memoized.