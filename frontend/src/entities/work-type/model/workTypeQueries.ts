import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { workTypeApi } from '@/entities/work-type/api/workTypeApi'
import type { CreateWorkTypeDto } from '@/entities/work-type/model/types'

export const workTypeKeys = {
  all: ['work-types'] as const,
  lists: () => [...workTypeKeys.all, 'list'] as const,
  list: () => [...workTypeKeys.lists()] as const,
}

export function useWorkTypes() {
  return useQuery({
    queryKey: workTypeKeys.list(),
    queryFn: () => workTypeApi.getAll(),
  })
}

export function useCreateWorkType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateWorkTypeDto) => workTypeApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workTypeKeys.all })
    },
  })
}
