import { Container, Group, Paper, Stack, Title } from '@mantine/core'
import { useWorkEntries } from '@/entities/work-entry'
import { AddWorkEntryModal } from '@/features/add-work-entry'
import { WorkLogTable } from '@/widgets/work-log-table'

export function WorkLogPage() {
  const { data: entries = [], isLoading, isError } = useWorkEntries()

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
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
