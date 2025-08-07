import type { TimelineItem } from "../models/timeline.model";

export function assignLanes(items: TimelineItem[]): TimelineItem[][] {
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const lanes: TimelineItem[][] = [];

  // To each item, try to find an existing lane or create a new one
  sortedItems.forEach((item) => {
    // Try to find a lane where the item can be placed
    let foundLane = false;

    for (let i = 0; i < lanes.length; i++) {
      const lane = lanes[i];
      const lastItem = lane[lane.length - 1];

      // If the current item starts after the last item of the lane ends
      if (new Date(item.start) >= new Date(lastItem.end)) {
        lane.push({ ...item, lane: i });
        foundLane = true;
        break;
      }
    }

    // If no lane is found, create a new one
    if (!foundLane) {
      lanes.push([{ ...item, lane: lanes.length }]);
    }
  });

  return lanes;
}
