import type {
  CreateWorkTypeDto,
  WorkType,
} from '@/entities/work-type/model/types'
import { api } from '@/shared/api/axios'

export const workTypeApi = {
  getAll: async (): Promise<WorkType[]> => {
    const { data } = await api.get<WorkType[]>('/work-types')
    return data
  },

  create: async (dto: CreateWorkTypeDto): Promise<WorkType> => {
    const { data } = await api.post<WorkType>('/work-types', dto)
    return data
  },
}
