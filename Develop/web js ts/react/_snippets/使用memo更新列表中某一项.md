
```ts
const qnaRef = useRef<IQnA | null>(null); // the current loading one
const { trigger: chat, isMutating: chating, data: chatData } = useMutation("service.finder.ai.chat", service.finder.ai.chat);
const [chatList, set_chatList] = useState<IQnA[]>([]);

const qna = chating ? qnaRef.current : null;

// onreq qna added to chatList
      try {
        const data = await chat({
          body: chatCtx,
        });
        qna.a.data = data;
      } catch (error: unknown) {
        qna.a.err = (error as Api.Error)?.message;
      }
//
{chatList.map((item) => {
  return <QnA key={item.id} data={item} qna={qna} />;
})}
//
interface IQnA {
  id: string;
  q: { text: string };
  a: { data?: ChatData; err?: string };
}
```

```tsx
const QnA = memo(
  ({ data, qna }: { data: IQnA; qna: IQnA | null }) => {
    kmDebug("render", data.id);
    const answer = data.a.data?.choices.map((item, i) => (
      <div key={i}>
        {item.message.map((msg, j) => (
          <div key={j}>{msg.content}</div>
        ))}
      </div>
    )) ?? <KmTypography.Text type="danger">出错了：{data.a.err}</KmTypography.Text>;
    return (
      <Fragment>
        {/* <div>{data.id}</div> */}
        <Answer content={answer} loading={qna?.id === data.id} />
        <Question content={data.q.text} />
      </Fragment>
    );
  },
  (prev, next) => (next.qna === null ? next.data !== prev.qna : true) // 请求完成后next.qna==null, 之前的qna!=data(namely equal)不更新； 请求中next.qna!=null, 新增元素不作更改？
);
```