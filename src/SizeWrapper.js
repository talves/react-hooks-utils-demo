import React from "react";
import useComponentSize from "@talves/use-component-size";
import usePrevious from "@talves/use-previous";

function sizeEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const SizeWrapper = ({ children, onSizeChange, ...props }) => {
  const wrapperRef = React.useRef(null);
  const componentSize = useComponentSize(wrapperRef); // A custom Hook
  const previousSize = usePrevious(componentSize);

  const handleSizeChange = React.useCallback(
    size => {
      if (typeof onSizeChange === "function") {
        onSizeChange(size);
      }
    },
    [onSizeChange]
  );
  React.useEffect(() => {
    const notEqual = !sizeEqual(componentSize, previousSize);
    if (notEqual) {
      handleSizeChange({
        current: componentSize,
        previous: previousSize
      });
    }
  }, [componentSize, previousSize, handleSizeChange]);

  return (
    <div ref={wrapperRef} {...props}>
      {children}
    </div>
  );
};

export default SizeWrapper;
