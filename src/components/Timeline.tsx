import { useMemo } from "react";
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

const getHeaderDate = (scale: TimelineScale, percent: number) => {
  return new Date(
    scale.startDate.getTime() +
      ((scale.endDate.getTime() - scale.startDate.getTime()) * percent) / 100
  ).toLocaleDateString();
};

export function Timeline({ items }: TimelineProps) {
  const lanes = useMemo(() => assignLanes(items), [items]);
  const scale = useMemo(() => createTimelineScale(items), [items]);

  return (
    <div className="w-full overflow-x-auto bg-white">
      <div className="min-w-[1000px]">
        {" "}
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
          <div className="absolute inset-0 flex">
            <div className="flex-1 border-r border-gray-200"></div>
            <div className="flex-1 border-r border-gray-200"></div>
            <div className="flex-1 border-r border-gray-200"></div>
            <div className="flex-1 border-r border-gray-200"></div>
            <div className="flex-1 border-r border-gray-200"></div>
          </div>

          {lanes.map((lane, laneIndex) => (
            <div
              key={laneIndex}
              className="flex h-20 border-b border-gray-200 relative"
            >
              {lane.map((item) => (
                <TimelineItem key={item.id} item={item} scale={scale} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
