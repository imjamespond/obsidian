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