export type WorkEntry = {
  id: string
  completedAt: string
  workTypeName: string
  volume: number
  unit: string
  executorName: string
}

export type CreateWorkEntryDto = Omit<WorkEntry, 'id'>
export type UpdateWorkEntryDto = Omit<WorkEntry, 'id'>
