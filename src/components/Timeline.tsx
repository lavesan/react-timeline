import { useMemo, useState, useRef, useEffect } from "react";

import type {
  TimelineItem as TimelineItemType,
  TimelineScale,
} from "../models/timeline.model";
import { assignLanes } from "../utils/assignLanes";
import { createTimelineScale } from "../utils/timelineScale";
import { TimelineItem } from "./TimelineItem";

interface TimelineProps {
  items: TimelineItemType[];
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4;
const BASE_WIDTH = 1000;

const getHeaderDate = (scale: TimelineScale, percent: number) => {
  return new Date(
    scale.startDate.getTime() +
      ((scale.endDate.getTime() - scale.startDate.getTime()) * percent) / 100
  ).toLocaleDateString();
};

export function Timeline({ items }: TimelineProps) {
  const [dbItems, setDbItems] = useState(items);
  const [zoomLevel, setZoomLevel] = useState(1);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lanes = useMemo(() => assignLanes(dbItems), [dbItems]);
  const scale = useMemo(() => createTimelineScale(dbItems), [dbItems]);

  const changeItemName = (itemId: number, newName: string) => {
    setDbItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, name: newName } : item
      )
    );
  };

  const startZooming = (isZoomIn: boolean) => {
    const adjust = isZoomIn ? 0.1 : -0.1;

    const timer = setInterval(() => {
      setZoomLevel((prev) => {
        const newZoom = prev + adjust;
        return Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
      });
    }, 100);

    pressTimer.current = timer;
  };

  const stopZooming = () => {
    if (pressTimer.current) {
      clearInterval(pressTimer.current);
      pressTimer.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopZooming();
    };
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Zoom controls */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200">
        <button
          onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, MIN_ZOOM))}
          onMouseDown={() => startZooming(false)}
          onMouseUp={stopZooming}
          onMouseLeave={stopZooming}
          onTouchStart={() => startZooming(false)}
          onTouchEnd={stopZooming}
          className="p-2 rounded hover:bg-gray-100 select-none touch-none"
          title="Zoom Out"
        >
          <span className="text-lg">−</span>
        </button>
        <div className="w-20 text-center text-sm">
          {Math.round(zoomLevel * 100)}%
        </div>
        <button
          onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, MAX_ZOOM))}
          onMouseDown={() => startZooming(true)}
          onMouseUp={stopZooming}
          onMouseLeave={stopZooming}
          onTouchStart={() => startZooming(true)}
          onTouchEnd={stopZooming}
          className="p-2 rounded hover:bg-gray-100 select-none touch-none"
          title="Zoom In"
        >
          <span className="text-lg">+</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: `${BASE_WIDTH * zoomLevel}px` }}>
          <div className="flex border-b border-gray-200">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="flex-1 p-2 text-xs text-gray-600 text-center border-r border-gray-200"
              >
                {getHeaderDate(scale, percent)}
              </div>
            ))}
          </div>
          <div className="relative">
            {lanes.map((lane, laneIndex) => (
              <div
                key={laneIndex}
                className="flex h-20 border-b border-gray-200 relative"
              >
                {lane.map((item) => (
                  <TimelineItem
                    changeItemName={changeItemName}
                    key={item.id}
                    item={item}
                    scale={scale}
                    zoomLevel={zoomLevel}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
