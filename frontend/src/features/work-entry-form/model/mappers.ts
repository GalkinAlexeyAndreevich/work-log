import type { CreateWorkEntryDto, WorkEntry } from '@/entities/work-entry'
import { toIsoDate } from '@/shared/lib/formatDate'
import type { WorkEntryFormValues } from './schema'

export function workEntryToFormValues(entry: WorkEntry): WorkEntryFormValues {
  return {
    completedAt: new Date(entry.completedAt),
    workTypeId: entry.workTypeId,
    volume: entry.volume,
    unit: entry.unit,
    executorName: entry.executorName,
  }
}

export function formValuesToWorkEntryDto(
  values: WorkEntryFormValues,
): CreateWorkEntryDto {
  return {
    completedAt: toIsoDate(values.completedAt),
    workTypeId: values.workTypeId,
    volume: values.volume,
    unit: values.unit.trim(),
    executorName: values.executorName.trim(),
  }
}
