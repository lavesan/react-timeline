import type { TimelineItem } from "../models/timeline.model";

/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @param items Array of timeline items to be organized into lanes
 * @returns an array of arrays containing items, where each sub-array represents a lane
 */
export function assignLanes(items: TimelineItem[]): TimelineItem[][] {
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const lanes: TimelineItem[][] = [];

  function assignItemToLane(item: TimelineItem): void {
    for (let i = 0; i < lanes.length; i++) {
      const lane = lanes[i];
      if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
        lane.push({ ...item, lane: i });
        return;
      }
    }
    lanes.push([{ ...item, lane: lanes.length }]);
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }

  return lanes;
}
