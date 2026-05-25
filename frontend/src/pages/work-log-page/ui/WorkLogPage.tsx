import { Container, Group, Paper, Stack, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useDeleteWorkEntry, useWorkEntries } from '@/entities/work-entry'
import { AddWorkEntryModal } from '@/features/add-work-entry'
import { WorkLogTable } from '@/widgets/work-log-table'

export function WorkLogPage() {
  const { data: entries = [], isLoading, isError } = useWorkEntries()
  const { mutateAsync: deleteEntry, isPending, variables } = useDeleteWorkEntry()

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
              isLoading={isLoading}
              hasError={isError}
              onDelete={handleDelete}
              deletingEntryId={isPending ? variables : undefined}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
