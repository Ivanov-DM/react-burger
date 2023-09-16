import React, { useCallback, useRef } from "react";
import sortedElementStyle from "./sorted-element.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../services/types/hook";
import {updateIngredientsAction} from "../../services/actions/burger-constructor";
import { Identifier } from "dnd-core";

interface ISortedElementProps {
  children: Array<JSX.Element>,
  index: number
}

type TDragObj = {
  index: number
}

type TDragCollectedProps = {
  isDragging: boolean;
}

type TDropCollectedProps = {
  handlerId: Identifier | null;
}

const SortedElement = ({ children, index }: ISortedElementProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement | null>(null);

  const updateIngredientsOrder = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        dispatch(updateIngredientsAction(dragIndex, hoverIndex));
      },
      [dispatch]
  );

  const [{handlerId}, dropRef] = useDrop<TDragObj, unknown, TDropCollectedProps>({
    accept: "item",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      updateIngredientsOrder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{isDragging}, dragRef] = useDrag<TDragObj, unknown, TDragCollectedProps>({
    type: "item",
    item: () => {
      return {index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });
  const opacity = isDragging ? 0 : 1;
  dragRef(dropRef(ref));

  return (
    <li className={sortedElementStyle.ingredient} style={{opacity}} ref={ref} data-handler-id={handlerId}>
      {children}
    </li>
  );
};

export default SortedElement;