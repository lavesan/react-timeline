import type {
  TimelineItem as TimelineItemType,
  TimelineScale,
} from "../models/timeline.model";

interface TimelineItemProps {
  item: TimelineItemType;
  scale: TimelineScale;
}

export function TimelineItem({ item, scale }: TimelineItemProps) {
  const left = scale.getPositionPercentage(item.start);
  const width = scale.getWidthPercentage(item.start, item.end);

  return (
    <div
      className="absolute h-20 py-2"
      style={{ left: `${left}%`, width: `${width}%` }}
    >
      <div
        className="line-clamp-2 leading-snug max-h-[3.5rem] break-words w-full bg-blue-500 border-blue-700 border text-white px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-blue-600 transition-colors overflow-hidden"
        style={{ minWidth: "50px" }}
        title={`${item.name}\n${item.start} to ${item.end}`}
      >
        {item.name}
      </div>
    </div>
  );
}
