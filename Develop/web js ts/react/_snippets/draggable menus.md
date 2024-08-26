useDraggalbe
```tsx
import React, { createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { useNewRef } from "@commons/hooks";
import { kmDebug } from "@commons/misc";

const defaultTransition = "transform 300ms";

export function useDraggable<Item extends { id: string }, Elem extends HTMLElement = HTMLElement>({
  items: _items,
  transition,
  renderItem,
}: {
  items?: Item[];
  transition?: string;
  renderItem: RenderItem<Item, Elem>;
}) {
  useStyles();
  const [renderItems, set_renderItems] = useState<{ item: Item; nodeRef: React.RefObject<Elem> }[]>();
  const [dragging, set_dragging] = useState(-1);
  const [entering, set_entering] = useState(-1);
  const draggingRef = useNewRef(dragging);
  const enteringRef = useNewRef(entering);
  const onDragStart: DragFunc<Elem> = (i, e) => {
    e.stopPropagation(); // 子节点响应时防止父子同时触发
    kmDebug("onDragStart", i);
    set_dragging(i);
  };
  const onDragEnd = useCallback<DragFunc<Elem>>((i, e) => {
    e.stopPropagation(); // 子节点响应时防止父子同时触发
    if (draggingRef.current < 0) return;
    const idrg = draggingRef.current;
    const ient = enteringRef.current;
    kmDebug("onDragEnd", i, idrg, ient);
    if (idrg >= 0 && ient >= 0) {
      // record first locations
      renderItemsRef.current?.forEach(({ item, nodeRef }) => {
        if (nodeRef.current) {
          const box = getLocation(nodeRef.current);
          const first = (firstLocs.current[item.id] ??= [0, 0]);
          first[0] = box.x;
          first[1] = box.y;
        }
      });

      set_renderItems((prev) => {
        if (prev) {
          const list = [...prev];
          list[idrg] = prev[ient]; // switch pos
          list[ient] = prev[idrg];
          return list;
        }
      });
    }
    set_dragging(-1);
    set_entering(-1);
    // eslint-disable-next-line
  }, []);
  const onDragEnter: DragFunc<Elem> = (i, e) => {
    e.preventDefault(); // 禁止回到原位
    e.stopPropagation(); // 子节点响应时防止父子同时触发
    kmDebug("onDragEnter");
    if (draggingRef.current < 0 || i === draggingRef.current) return; // 防止其它组件响应
    set_entering(i);
  };
  const onDragLeave: DragFunc<Elem> = (_, e) => {
    e.stopPropagation(); // 子节点响应时防止父子同时触发
    kmDebug("onDragLeave");
    if (enteringRef.current < 0 || renderItemsRef.current === undefined) return;
    const item = renderItemsRef.current[enteringRef.current];
    if (item.nodeRef.current && isOutside(e.clientX, e.clientY, item.nodeRef.current)) {
      // 超出enter elem之外
      set_entering(-1);
    }
  };
  const onDragOver: DragFunc<Elem> = (_, e) => {
    e.stopPropagation(); // 子节点响应时防止父子同时触发
    e.preventDefault(); // 禁止回到原位
  };

  const renderItemsRef = useNewRef(renderItems);
  const firstLocs = useRef<{ [k: string]: [number, number] }>({});

  useEffect(() => {
    renderItemsRef.current?.forEach(({ item, nodeRef }) => {
      const first = firstLocs.current[item.id];
      const elem = nodeRef.current;
      if (elem && first) {
        const box = getLocation(elem);
        const [fx, fy] = first;
        const dx = fx - box.x,
          dy = fy - box.y;
        elem.style.transform = `translateX(${dx}px) translateY(${dy}px)`;
        elem.style.transition = "";
      }
    });
    // 产生css动画
    setTimeout(() => {
      renderItemsRef.current?.forEach(({ nodeRef }) => {
        const elem = nodeRef.current;
        if (elem) {
          elem.style.transition = transition ?? defaultTransition;
          elem.style.transform = "";
        }
      });
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderItems]);

  useEffect(() => {
    set_renderItems((prev) => {
      if (_items) {
        return (_items || []).map((item) => {
          return { item, nodeRef: createRef<Elem>() };
        });
      }
      return prev;
    });
  }, [_items]);

  return useMemo(() => {
    // kmDebug("renderNodes", renderItems);
    const renderNodes = renderItems?.map(({ item, nodeRef }, i) => {
      return renderItem({
        nodeRef,
        item,
        dragging: dragging === i,
        entering: entering === i,
        index: i,
        onDragStart,
        onDragEnd,
        onDragEnter,
        onDragLeave,
        onDragOver,
      });
    });
    return [renderNodes, renderItems] as const;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderItems, dragging, entering]);
}

type DragFunc<Elem extends HTMLElement = HTMLElement> = (i: number, event: React.DragEvent<Elem>) => void;

/**
 * 
 * @description example

  <KmCol
    key={item.id}
    ref={nodeRef}
    draggable
    className={clsx("_km_drag_item", "mb-5", { _km_dragging: dragging, _km_entering: entering })}
    data-drag-item={name}
    span={(parseInt(item.id) % 6) * 4 + 4}
    onDragStart={onDragStart.bind(null, index)}
    onDragEnd={onDragEnd.bind(null, index)}
    onDragEnter={onDragEnter.bind(null, index)}
    onDragLeave={onDragLeave.bind(null, index)}
    onDragOver={onDragOver.bind(null, index)}
  >
    <KmCard>{item.id}</KmCard>
  </KmCol>

 */
export interface RenderItem<T, Elem extends HTMLElement = HTMLElement> {
  (params: {
    nodeRef: React.RefObject<Elem>;
    item: T;
    dragging: boolean; // 是否正在拖动
    entering: boolean;
    index: number; // 数组索引
    onDragStart: DragFunc<Elem>;
    onDragEnd: DragFunc<Elem>;
    onDragEnter: DragFunc<Elem>;
    onDragLeave: DragFunc<Elem>;
    onDragOver: DragFunc<Elem>;
  }): React.ReactNode;
}

function getLocation(elem: HTMLElement) {
  const rect = elem.getBoundingClientRect();
  return rect;
}

function isOutside(x: number, y: number, elem: HTMLElement) {
  const rect = elem.getBoundingClientRect();
  return x > rect.left + rect.width || x < rect.left || y > rect.top + rect.height || y < rect.top;
}

const useStyles = createUseStyles({
  "@global": {
    body: {
      "& ._km_drag": {
        "& ._km_drag_item": {
          border: "1px solid transparent",
          "&._km_dragging": {
            opacity: 0.3,
          },
          "&._km_entering": {
            border: "1px dashed #888888",
          },
        },
      },
    },
  },
});

```


--- 

```tsx
import React, { createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { KmCard, KmCol, KmRow } from "@components";
import { maxWidth } from "@config";
import { useNewRef } from "@commons/hooks";
import { kmDebug } from "@commons/misc";

function FC({ name }: { name: string }) {
  const styles = useStyles();
  const [items, set_items] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [dragging, set_dragging] = useState(-1);
  const [entering, set_entering] = useState(-1);
  const draggingRef = useNewRef(dragging);
  const enteringRef = useNewRef(entering);
  const onDragStart = useCallback((i: number) => {
    kmDebug("onDragStart", i);
    set_dragging(i);
  }, []);
  const onDragEnd = useCallback((i: number) => {
    const idrg = draggingRef.current;
    const ient = enteringRef.current;
    kmDebug("onDragEnd", i, idrg, ient);
    if (idrg >= 0 && ient >= 0) {
      // record first locations
      menuItemsRef.current.forEach(({ item, nodeRef }) => {
        if (nodeRef.current) {
          const box = getLocation(nodeRef.current);
          const first = (firstLocs.current[item] ??= [0, 0]);
          first[0] = box.x;
          first[1] = box.y;
        }
      });

      set_items((prev) => {
        const list = [...prev];
        list[idrg] = prev[ient]; // switch pos
        list[ient] = prev[idrg];
        return list;
      });
    }
    set_dragging(-1);
    set_entering(-1);
    // eslint-disable-next-line
  }, []);

  const menuItems = useMemo(() => {
    return items.map((item) => {
      return { item, nodeRef: createRef<HTMLDivElement>() };
    });
  }, [items]);

  const menuItemsRef = useNewRef(menuItems);
  const firstLocs = useRef<{ [k: string]: [number, number] }>({});

  useEffect(() => {
    menuItemsRef.current.forEach(({ item, nodeRef }) => {
      const first = firstLocs.current[item];
      const elem = nodeRef.current;
      if (elem && first) {
        const box = getLocation(elem);
        const [fx, fy] = first;
        const dx = fx - box.x,
          dy = fy - box.y;
        elem.style.transform = `translateX(${dx}px) translateY(${dy}px)`;
        elem.style.transition = "";
        setTimeout(() => {
          elem.style.transition = "transform 1300ms";
          elem.style.transform = "";
        }, 0);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItems]);

  return (
    // TransitionGroup
    <KmRow className={clsx(styles.root, "w-100")}>
      {menuItems.map(({ item, nodeRef }, i) => {
        // const isIn = reorder ? reorder[0] === i || reorder[1] === i : false;
        return (
          <KmCol
            key={item}
            ref={nodeRef}
            draggable
            className={clsx("_km_item", "mb-5", { _km_dragging: dragging === i, _km_entering: entering === i })}
            data-drag-item={name}
            span={(item % 3) * 8 + 8}
            onDragStart={() => {
              // e.dataTransfer.effectAllowed = "move"; // 禁止加号
              onDragStart(i);
            }}
            onDragEnd={() => {
              onDragEnd(i);
            }}
            onDragEnter={(e) => {
              e.preventDefault(); // 禁止回到原位
              set_entering(i);
            }}
            onDragLeave={(e) => {
              const dragItem = (e.target as HTMLElement).getAttribute("data-drag-item");
              kmDebug("onDragLeave", dragItem);
              if (isOutside(e.clientX, e.clientY, e.target as HTMLElement)) {
                set_entering(-1);
              }
            }}
            onDragOver={(e) => {
              e.preventDefault(); // 禁止回到原位
            }}
          >
            <KmCard>{item}</KmCard>
          </KmCol>
        );
      })}
    </KmRow>
  );
}

export default FC;

function getLocation(elem: HTMLElement) {
  const rect = elem.getBoundingClientRect();
  return rect;
}

function isOutside(x: number, y: number, elem: HTMLElement) {
  const rect = elem.getBoundingClientRect();
  return x > rect.left + rect.width || x < rect.left || y > rect.top + rect.height || y < rect.top;
}

const useStyles = createUseStyles({
  root: {
    margin: "0px auto",
    maxWidth,
    "& ._km_item": {
      border: "1px solid transparent",
      "&._km_dragging": {
        opacity: 0.3,
      },
      "&._km_entering": {
        border: "1px dashed #888888",
      },
    },
  },
});

```