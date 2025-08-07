import { useState, useRef, useEffect } from "react";

import type {
  TimelineItem as TimelineItemType,
  TimelineScale,
} from "../models/timeline.model";

interface TimelineItemProps {
  item: TimelineItemType;
  scale: TimelineScale;
  zoomLevel: number;
  changeItemName: (itemId: number, newName: string) => void;
}

export function TimelineItem({
  item,
  scale,
  zoomLevel,
  changeItemName,
}: TimelineItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const left = scale.getPositionPercentage(item.start);
  const width = scale.getWidthPercentage(item.start, item.end);

  let minWidth = `${50 * zoomLevel}px`;

  if (isEditing) {
    minWidth = `${zoomLevel < 1 ? 200 : 100}px`;
  }

  const onClickItem = () => {
    setIsEditing(true);
  };

  const onChangeItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeItemName(item.id, e.target.value);
    setIsEditing(false);
  };

  const onBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.value = item.name;
    setIsEditing(false);
  };

  const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChangeItemName({
        target: { value: e.currentTarget.value },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`absolute h-20 py-2 hover:z-50 ${isEditing ? "z-50" : ""}`}
      style={{
        left: `${left}%`,
        width: `${width}%`,
      }}
    >
      <div
        className={`w-full bg-blue-500 border-blue-700 border text-white px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-blue-600 transition-colors ${
          isEditing
            ? ""
            : "line-clamp-2 leading-snug max-h-[3.5rem] break-words overflow-hidden"
        }`}
        style={{ minWidth }}
        title={`${item.name}\n${item.start} to ${item.end}`}
        onClick={onClickItem}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            defaultValue={item.name}
            onBlur={onBlurInput}
            onKeyDown={onKeyDownInput}
            className="px-2 py-1 w-full h-full text-sm rounded border border-white bg-blue-500 text-white focus:outline-none focus:ring-0"
          />
        ) : (
          item.name
        )}
      </div>
    </div>
  );
}
