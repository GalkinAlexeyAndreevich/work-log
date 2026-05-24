import { Container, Group, Paper, Stack, Title } from '@mantine/core'
import { useState } from 'react'
import type { CreateWorkEntryDto, WorkEntry } from '@/entities/work-entry'
import { AddWorkEntryModal } from '@/features/add-work-entry'
import { WorkLogTable } from '@/widgets/work-log-table'

const initialEntries: WorkEntry[] = [
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
  const [entries, setEntries] = useState(initialEntries)

  const handleAddEntry = (dto: CreateWorkEntryDto) => {
    setEntries((prev) => [
      { ...dto, id: crypto.randomUUID() },
      ...prev,
    ])
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Журнал работ</Title>
          <AddWorkEntryModal onSubmit={handleAddEntry} />
        </Group>

        <Paper p="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Записи</Title>
            <WorkLogTable entries={entries} />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
