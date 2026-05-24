import type { CreateWorkEntryDto } from '@/entities/work-entry'
import { toIsoDate } from '@/shared/lib/formatDate'
import type { AddWorkEntryFormValues } from './schema'

export function prepareWorkEntry(
  values: AddWorkEntryFormValues,
): CreateWorkEntryDto {
  return {
    completedAt: toIsoDate(values.completedAt),
    workTypeName: values.workTypeName.trim(),
    volume: values.volume,
    unit: values.unit.trim(),
    executorName: values.executorName.trim(),
  }
}
