export interface TimelineItem {
  id: number;
  start: string;
  end: string;
  name: string;
  lane?: number;
}

export interface TimelineScale {
  startDate: Date;
  endDate: Date;
  getPositionPercentage: (date: string) => number;
  getWidthPercentage: (startDate: string, endDate: string) => number;
}
