import type {
  CreateWorkTypeDto,
  WorkType,
} from '@/entities/work-type/model/types'
import { api } from '@/shared/api/axios'

const BASE_URL = '/work-types'

export const workTypeApi = {
  getAll: async (): Promise<WorkType[]> => {
    const { data } = await api.get<WorkType[]>(BASE_URL)
    return data
  },

  create: async (dto: CreateWorkTypeDto): Promise<WorkType> => {
    const { data } = await api.post<WorkType>(BASE_URL, dto)
    return data
  },
}
