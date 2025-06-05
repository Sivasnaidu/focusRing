// FocusRing.js
import React, { useEffect, useState } from "react";
import "spatial-navigation-js";

const ringStyles = {
  position: "fixed",
  // pointerEvents: "none",
  border: "4px solid #fff",
  transition:
    "top 0.5s ease-in-out, left 0.5s ease, width 0.5s ease-in-out, height 0.5s ease-in-out, opacity 0.15s ease-in-out, scale 0.15s ease-in-out",
};

const FocusRing = () => {
  const [activeElement, setActiveElement] = useState(document.body);

  const focusInListener = (event) => {
    const newElement = event.target;
    if (newElement !== activeElement) {
      setActiveElement(newElement);
    }
  };

  const focusOutListener = (event) => {
    const newElement = event.relatedTarget;
    if (!newElement) {
      setActiveElement(document.body);
    }
  };

  useEffect(() => {
    document.body.addEventListener("focusin", focusInListener, true);
    document.body.addEventListener("focusout", focusOutListener, true);

    return () => {
      document.body.removeEventListener("focusin", focusInListener, true);
      document.body.removeEventListener("focusout", focusOutListener, true);
    };
  }, [activeElement]);

  const updateRing = () => {
    const newBox = activeElement.getBoundingClientRect();
    const borderWidth = activeElement.offsetHeight - activeElement.clientHeight;
    const updatedStyles = {
      ...ringStyles,
      top: `${newBox.top - borderWidth}px`,
      bottom: `${newBox.bottom}px`,
      right: `${newBox.right}px`,
      left: `${newBox.left - borderWidth}px`,
      width: `${newBox.width}px`,
      height: `${newBox.height}px`,

      // top: `${activeElement.offsetTop - (ringStyles.borderSize || 0) / 2}px`, // Account for border
      // left: `${activeElement.offsetLeft - (ringStyles.borderSize || 0) / 2}px`, // Account for border
      // width: `${activeElement.offsetWidth}px`,
      // height: `${activeElement.offsetHeight}px`,
    };
    // updatedStyles.element = newBox;
    // updatedStyles.center = {
    //   x:
    //     updatedStyles.left +
    //     Math.floor((updatedStyles.width - borderWidth) / 2),
    //   y:
    //     updatedStyles.top +
    //     Math.floor((updatedStyles.height - borderWidth) / 2),
    // };
    // updatedStyles.center.left = updatedStyles.center.right =
    //   updatedStyles.center.x;
    // updatedStyles.center.top = updatedStyles.center.bottom =
    //   updatedStyles.center.y;
    return updatedStyles;
  };

  return (
    <div
      id="focus-ring"
      className={`init-hidden ${
        activeElement === document.body ? "hidden" : "visible"
      }`}
      style={updateRing()}
    />
  );
};

export default FocusRing;
