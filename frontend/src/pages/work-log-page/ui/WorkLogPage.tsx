import { Container, Group, Paper, Stack, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useMemo, useState } from 'react'
import {
  type WorkEntry,
  useDeleteWorkEntry,
  useWorkEntries,
} from '@/entities/work-entry'
import { useWorkTypes } from '@/entities/work-type'
import { AddWorkEntryModal, EditWorkEntryModal } from '@/features/work-entry-form'
import { WorkLogTable } from '@/widgets/work-log-table'

export function WorkLogPage() {
  const { data: entries = [], isLoading, isError } = useWorkEntries()
  const { data: workTypes = [] } = useWorkTypes()
  const [editingEntry, setEditingEntry] = useState<WorkEntry | null>(null)
  const { mutateAsync: deleteEntry, isPending, variables } = useDeleteWorkEntry()
  const workTypeNamesById = useMemo(
    () =>
      Object.fromEntries(workTypes.map((workType) => [workType.id, workType.name])),
    [workTypes],
  )

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry(id)
      notifications.show({
        title: 'Запись удалена',
        message: 'Запись скрыта из журнала',
        color: 'green',
      })
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось удалить запись',
        color: 'red',
      })
    }
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Журнал работ</Title>
          <AddWorkEntryModal />
        </Group>

        <Paper p="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Записи</Title>
            <WorkLogTable
              entries={entries}
              workTypeNamesById={workTypeNamesById}
              isLoading={isLoading}
              hasError={isError}
              onEdit={setEditingEntry}
              onDelete={handleDelete}
              deletingEntryId={isPending ? variables : undefined}
            />
          </Stack>
        </Paper>
      </Stack>

      <EditWorkEntryModal
        entry={editingEntry}
        onClose={() => setEditingEntry(null)}
      />
    </Container>
  )
}
