- [useTransition](https://react.dev/reference/react/useTransition)
==a React Hook that lets you update the state without blocking the UI.== 
tab切换时卡死，换这个后虽然仍卡，但UI还能响应。其实只是分片，例子中是分500片每片1ms，但如果是分5片，每片1秒还是会卡
```jsx
const PostsTab = memo(function PostsTab() {
  // Log once. The actual slowdown is inside SlowPost.
  console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');

  let items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
});

function SlowPost({ index }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Post #{index + 1}
    </li>
  );
}

TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button onClick={() => {
      startTransition(() => {
        onClick();
      });
    }}>
      {children}
    </button>
  );
}

export default function TabContainer() {
  const [tab, setTab] = useState('about');
  return (
    <>
      <TabButton
        isActive={tab === 'about'}
        onClick={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        onClick={() => setTab('posts')}
      >
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        onClick={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </>
  );
}

```

- [useDeferedValue](https://react.dev/reference/react/useDeferredValue)
==a React Hook that lets you defer updating a part of the UI.==
其实本质还是分片的问题，这种会忽略部分分片，若将分片从250改成2，每片时间从1改为1000一样会卡
频繁改变input value 时，忽略中间一些value的计算，[和debounce的区别是](https://juejin.cn/post/7126533788896591886)，debounce会always延迟，而defer只是cpu慢时延时，快时不会延时
```jsx
const SlowList = memo(function SlowList({ text }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');

  let items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
}, (prev, next) => {
  return prev.dataNodes === next.dataNodes && prev.text === next.text
});

function SlowItem({ text }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Text: {text}
    </li>
  )
}

export default function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
```

### ==Pitfall==

This optimization ==requires `SlowList` to be wrapped in [`memo`.](https://react.dev/reference/react/memo)== This is because whenever the `text` changes, React needs to be able to re-render the parent component quickly. During that re-render, `deferredText` still has its previous value, so `SlowList` is able to skip re-rendering (its props have not changed). ==**Without [`memo`,](https://react.dev/reference/react/memo)** it would have to re-render anyway, **defeating the point of the optimization**.==
必须要包裹在memo中！当text改变，父节点要快速重渲染，在之中defered仍然是之前的值

渲染顺序是，从分片中取出部分渲染，如果value改变就渲染新的value分片组.
```
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] m
[ARTIFICIALLY SLOW] m
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] mm
[ARTIFICIALLY SLOW] mm
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] mmm
[ARTIFICIALLY SLOW] mmm
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] mmmm
[ARTIFICIALLY SLOW] mmmm
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />
[ARTIFICIALLY SLOW] mmmmm
[ARTIFICIALLY SLOW] mmmmm
[ARTIFICIALLY SLOW] mmmmm
[ARTIFICIALLY SLOW] mmmmm
[ARTIFICIALLY SLOW] mmmmm
[ARTIFICIALLY SLOW] mmmmm
```