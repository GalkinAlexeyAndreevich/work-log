export type WorkEntry = {
  id: string
  completedAt: string
  workTypeId: string
  volume: number
  unit: string
  executorName: string
}

type WorkEntryPayload = Omit<WorkEntry, 'id'>

export type CreateWorkEntryDto = WorkEntryPayload
export type UpdateWorkEntryDto = WorkEntryPayload
