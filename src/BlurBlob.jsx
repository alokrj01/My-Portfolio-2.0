import React, { memo } from "react";
import PropTypes from "prop-types";

const BlurBlob = ({
  position = { top: "50%", left: "50%" },
  size = { width: "300px", height: "300px" },
  color = "bg-purple-500",
  opacity = "opacity-20",
  blur = "blur-3xl",
  animation = "",
  zIndex = "z-0",
}) => {
  return (
    <div
      className={`absolute ${zIndex} pointer-events-none`}
      style={{
        top: position.top,
        left: position.left,
        width: size.width,
        height: size.height,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`w-full h-full rounded-full ${color} ${opacity} ${blur} ${animation}`}
      />
    </div>
  );
};

// Prop validation
BlurBlob.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  color: PropTypes.string,
  opacity: PropTypes.string,
  blur: PropTypes.string,
  animation: PropTypes.string,
  zIndex: PropTypes.string,
};

export default memo(BlurBlob);