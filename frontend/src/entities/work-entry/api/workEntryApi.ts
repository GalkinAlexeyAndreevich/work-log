import type {
  CreateWorkEntryDto,
  UpdateWorkEntryDto,
  WorkEntry,
} from '@/entities/work-entry/model/types'
import { api } from '@/shared/api/axios'

const BASE_URL = '/work-entries'

export const workEntryApi = {
  getAll: async (): Promise<WorkEntry[]> => {
    const { data } = await api.get<WorkEntry[]>(BASE_URL)
    return data
  },

  create: async (dto: CreateWorkEntryDto): Promise<WorkEntry> => {
    const { data } = await api.post<WorkEntry>(BASE_URL, dto)
    return data
  },

  update: async (id: string, dto: UpdateWorkEntryDto): Promise<WorkEntry> => {
    const { data } = await api.patch<WorkEntry>(`${BASE_URL}/${id}`, dto)
    return data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`)
  },
}
