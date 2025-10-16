"use client";

import { useState } from "react";

interface ResourcesSwitchProps {
  onModeChange?: (isNotices: boolean) => void;
  defaultMode?: "notices" | "downloads";
}

const ResourcesSwitch = ({
  onModeChange,
  defaultMode = "notices",
}: ResourcesSwitchProps) => {
  const [isNotices, setIsNotices] = useState(defaultMode === "downloads");

  const toggleMode = () => {
    const newMode = !isNotices;
    setIsNotices(newMode);
    onModeChange?.(newMode);
  };

  return (
    <div className="mr-1 ">
      <label className="shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-secondary">
        <input
          type="checkbox"
          className="sr-only"
          checked={isNotices}
          onChange={toggleMode}
        />
        <span
          className={`flex items-center space-x-[6px] rounded  py-1.5 px-[18px] text-base font-medium transition-all ${
            !isNotices
              ? "bg-primary/80 text-white ease-in-out duration-500"
              : "ease-in-out duration-500"
          }`}
        >
          Notices
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-1.5 px-[18px] text-base font-medium transition-all ${
            isNotices
              ? "text-white bg-primary/80  ease-in-out duration-500"
              : "ease-in-out duration-500"
          }`}
        >
          Downloads
        </span>
      </label>
    </div>
  );
};

export default ResourcesSwitch;
