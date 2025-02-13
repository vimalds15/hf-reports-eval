import { useRef, useState } from "react";

const useDragAndResize = ({ xThreshold = 100 } = {}) => {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState(0);
  const [position, setPosition] = useState(0);
  const [col, setCols] = useState(1);
  const [colStart, setColStart] = useState(1);
  const [placeHolderHighlight, setPlaceHolderHighlight] = useState("");

  const handleMouseDown = (e) => {
    setIsDragging(true);
    childRef.current.style.cursor = "grabbing";
    setInitialPosition(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - initialPosition;
    setPosition(newX);

    const horizontalResizeThreshold =
      Math.abs(e.clientX - initialPosition) > 25;

    const parent = parentRef.current;
    const parentRect = parent.getBoundingClientRect();

    if (horizontalResizeThreshold && e.clientX > parentRect.right) {
      setCols(2);
      setColStart(2);
      reset();
      return;
    } else if (horizontalResizeThreshold && e.clientX < parentRect.left) {
      setCols(2);
      setColStart(1);
      reset();
      return;
    }

    if (e.clientX < parentRect.left + xThreshold) {
      setPlaceHolderHighlight("left");
    } else if (e.clientX > parentRect.right - xThreshold) {
      setPlaceHolderHighlight("right");
    } else if (horizontalResizeThreshold) {
      setPlaceHolderHighlight("full");
    }
  };

  const handleMouseUp = (e) => {
    childRef.current.style.cursor = "grab";
    const parent = parentRef.current;
    const parentRect = parent.getBoundingClientRect();

    const horizontalResizeThreshold =
      Math.abs(e.clientX - initialPosition) > 25;

    if (horizontalResizeThreshold && e.clientX < parentRect.left + xThreshold) {
      setCols(2);
      setColStart(1);
    } else if (
      horizontalResizeThreshold &&
      e.clientX > parentRect.right - xThreshold
    ) {
      setCols(2);
      setColStart(2);
    } else if (horizontalResizeThreshold) {
      setCols(1);
      setColStart(1);
    }
    reset();
  };

  const reset = () => {
    setPlaceHolderHighlight("");
    setPosition(0);
    setIsDragging(false);
  };

  return {
    parentRef,
    childRef,
    col,
    colStart,
    setCols,
    setColStart,
    position,
    placeHolderHighlight,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    reset,
  };
};

export default useDragAndResize;
