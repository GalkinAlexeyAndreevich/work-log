export type WorkEntryResponse = {
  id: string;
  completedAt: string;
  workTypeId: string;
  volume: number;
  unit: string;
  executorName: string;
};

type WorkEntryEntity = {
  id: string;
  completedAt: Date;
  workTypeId: string;
  volume: { toString(): string };
  unit: string;
  executorName: string;
};

export function mapWorkEntry(entry: WorkEntryEntity): WorkEntryResponse {
  return {
    id: entry.id,
    completedAt: entry.completedAt.toISOString().slice(0, 10),
    workTypeId: entry.workTypeId,
    volume: Number(entry.volume),
    unit: entry.unit,
    executorName: entry.executorName,
  };
}
