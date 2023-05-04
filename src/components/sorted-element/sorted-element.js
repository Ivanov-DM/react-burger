import React, { useCallback, useRef } from "react";
import sortedElementStyle from "./sorted-element.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { UPDATE_INGREDIENTS_ORDER } from "../../services/actions/burger-constructor";

const SortedElement = ({ children, index }) => {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "item",
    item: { index },
  });

  const updateIngredientsOrder = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({ type: UPDATE_INGREDIENTS_ORDER, dragIndex, hoverIndex });
    },
    [dispatch]
  );

  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      updateIngredientsOrder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return (
    <li className={sortedElementStyle.ingredient} ref={dragDropRef}>
      {children}
    </li>
  );
};

export default SortedElement;
