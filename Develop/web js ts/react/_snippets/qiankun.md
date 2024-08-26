```tsx
import { loadMicroApp, MicroApp, ObjectType } from "qiankun";
import { initGlobalState, MicroAppStateActions } from "qiankun";
import React, { Fragment, HTMLAttributes, useEffect, useRef } from "react";
import { useSafeState, useUpdate } from "@commons/hooks";
import { kmDebug } from "@commons/misc";
import { Loading } from "@components";

// 初始化 state
const actions: MicroAppStateActions = initGlobalState();

// actions.onGlobalStateChange((state, prev) => {
//   // state: 变更后的状态; prev 变更前的状态
//   console.log(state, prev);
// });
// actions.setGlobalState(state);
// actions.offGlobalStateChange();

function FC<T extends ObjectType>({
  props,
  state,
  name,
  entry,
  attrs,
}: {
  props?: T;
  state?: Record<string,unknown>;
  name: string;
  entry: string;
  attrs?: HTMLAttributes<HTMLDivElement>;
}) {
  const container = useRef<HTMLDivElement>(null);
  const microApp = useRef<MicroApp>();

  const count = useRef(0);
  const initial = useRef({ entry, name, props, lock: false });

  const [loading, setLoading] = useSafeState(true);

  useEffect(() => {
    //
    const { entry, name, props } = initial.current;
    kmDebug("loadMicroApp", name);

    // prevent strict mode render twice
    if (process.env.devMode) {
      count.current++;
      if (count.current === 1) {
        return;
      }
    }

    if (container.current) {
      microApp.current = loadMicroApp(
        {
          name,
          entry: `${entry}?time=${Date.now()}`,
          container: container.current,
          props,
        }
        // { sandbox: false, singular: false } // https://github.com/umijs/qiankun/issues/2547, 不允许共用相同entry
      );
      microApp.current.loadPromise.finally(() => {
        setLoading(false);
      });
    }

    return () => {
      // setTimeout(() => {
      if (microApp.current?.getStatus() === "MOUNTED") {
        kmDebug("unmount:", name);
        microApp.current
          .unmount()
          .then(() => {
            kmDebug("unmounted:", name);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // }, 5000);
    };
    // eslint-disable-next-line
  }, []);

  useUpdate(() => {
    if (microApp.current?.getStatus() === "MOUNTED") {
      kmDebug("update", initial.current.name, props);
      props && microApp.current?.update?.(props);
    }
  }, [props, /* loading 避免启动后再次更新 */]);

  useUpdate(() => {
    loading === false && state && actions.setGlobalState(state)
  }, [state, loading]);

  return (
    <Fragment>
      {/* <button
        onClick={() => {
          microApp.current?.unmount();
        }}
      >
        destroy
      </button> */}
      {loading && <Loading tip="加载微应用中..." />}
      <div className="km-qkapp" {...attrs} ref={container} />
    </Fragment>
  );
}

export default FC;

```