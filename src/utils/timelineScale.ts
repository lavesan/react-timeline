import type { TimelineScale } from "../models/timeline.model";

export function createTimelineScale(
  items: { start: string; end: string }[]
): TimelineScale {
  // Find the earliest start date and latest end date
  const dates = items.flatMap((item) => [
    new Date(item.start),
    new Date(item.end),
  ]);
  const startDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const endDate = new Date(Math.max(...dates.map((d) => d.getTime())));
  // Adds more days so the last elements of the timeline are not cut off
  endDate.setDate(endDate.getDate() + 8);

  // Total duration in milliseconds
  const totalDuration = endDate.getTime() - startDate.getTime();

  return {
    startDate,
    endDate,
    // Function to get the position percentage of the timeline item in the lane
    getPositionPercentage: (date: string): number => {
      const position = new Date(date).getTime() - startDate.getTime();
      return (position / totalDuration) * 100;
    },
    // Function to get the width percentage of the timeline item in the lane
    getWidthPercentage: (start: string, end: string): number => {
      const duration = new Date(end).getTime() - new Date(start).getTime();

      const percentage = (duration / totalDuration) * 100;

      return Math.max(percentage, 2);
    },
  };
}
