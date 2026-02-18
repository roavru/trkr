export type TrackerType = "bool" | "numeric";

export interface TrackerInfo {
  name: string;
  fileName: string;
  type: TrackerType;
  todayValue: number | null;
}
