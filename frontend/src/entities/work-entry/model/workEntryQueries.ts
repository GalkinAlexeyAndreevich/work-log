import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { workEntryApi } from '@/entities/work-entry/api/workEntryApi'
import type {
  CreateWorkEntryDto,
  UpdateWorkEntryDto,
} from '@/entities/work-entry/model/types'

export const workEntryKeys = {
  all: ['work-entries'] as const,
  lists: () => [...workEntryKeys.all, 'list'] as const,
  list: () => [...workEntryKeys.lists()] as const,
}

export function useWorkEntries() {
  return useQuery({
    queryKey: workEntryKeys.list(),
    queryFn: () => workEntryApi.getAll(),
  })
}

export function useCreateWorkEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateWorkEntryDto) => workEntryApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workEntryKeys.all })
    },
  })
}

export function useDeleteWorkEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => workEntryApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workEntryKeys.all })
    },
  })
}

export function useUpdateWorkEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateWorkEntryDto }) =>
      workEntryApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workEntryKeys.all })
    },
  })
}
