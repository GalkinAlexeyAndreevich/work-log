import { Container, Paper, Stack, Title } from '@mantine/core'
import type { WorkEntry } from '@/entities/work-entry'
import { WorkLogTable } from '@/widgets/work-log-table'

const mockEntries: WorkEntry[] = [
  {
    id: '1',
    completedAt: '2026-05-20',
    workTypeName: 'Кладка перегородок',
    volume: 42,
    unit: 'м²',
    executorName: 'Иванов И.И.',
  },
  {
    id: '2',
    completedAt: '2026-05-22',
    workTypeName: 'Штукатурка стен',
    volume: 18.5,
    unit: 'м³',
    executorName: 'Петров А.С.',
  },
]

export function WorkLogPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Title order={1}>Журнал работ</Title>

        <Paper p="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Записи</Title>
            <WorkLogTable entries={mockEntries} />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
