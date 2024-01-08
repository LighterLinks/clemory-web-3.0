import { motion } from "framer-motion";
import { memo } from "react";

function Toggle({
  width,
  height,
  flag,
  colorSet,
}: {
  width: number;
  height: number;
  flag: boolean;
  colorSet: {
    BG1: string;
    BG2: string;
    TG1: string;
    TG2: string;
  };
}) {
  return (
    <motion.div
      style={{
        position: "relative",
        width: width,
        height: height,
        borderRadius: height / 2 + 5,
        backgroundColor: flag ? colorSet.BG1 : colorSet.BG2,
        // border: `1px solid ${!flag ? "#E0E0E0" : "#E0E0E0"}`,
        cursor: "pointer",
      }}
      animate={{ backgroundColor: flag ? colorSet.BG1 : colorSet.BG2 }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: height - 4,
          height: height - 4,
          borderRadius: height / 2,
          backgroundColor: flag ? colorSet.TG1 : colorSet.TG2,
          top: 2,
          left: flag ? width - height + 2 : 2,
        }}
        animate={{ left: !flag ? width - height + 2 : 2 }}
      />
    </motion.div>
  );
}

export default memo(Toggle);
