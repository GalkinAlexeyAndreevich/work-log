import type { CreateWorkEntryDto, WorkEntry } from '@/entities/work-entry/model/types'
import { api } from '@/shared/api/axios'

export const workEntryApi = {
  getAll: async (): Promise<WorkEntry[]> => {
    const { data } = await api.get<WorkEntry[]>('/work-entries')
    return data
  },

  create: async (dto: CreateWorkEntryDto): Promise<WorkEntry> => {
    const { data } = await api.post<WorkEntry>('/work-entries', dto)
    return data
  },
}
