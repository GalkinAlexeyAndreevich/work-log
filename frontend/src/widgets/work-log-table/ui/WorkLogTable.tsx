import { Alert, Center, Loader, Table, Text } from '@mantine/core'
import type { WorkEntry } from '@/entities/work-entry'
import { formatDisplayDate } from '@/shared/lib/formatDate'
import { formatVolume } from '@/shared/lib/formatVolume'

type WorkLogTableProps = {
  entries: WorkEntry[]
  isLoading: boolean
  hasError: boolean
}

export function WorkLogTable({
  entries,
  isLoading,
  hasError,
}: WorkLogTableProps) {
  if (isLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    )
  }

  if (hasError) {
    return (
      <Alert color="red" title="Ошибка загрузки">
        Не удалось загрузить записи журнала
      </Alert>
    )
  }

  if (entries.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        Записей пока нет. Добавьте первую работу через кнопку выше.
      </Text>
    )
  }

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Дата</Table.Th>
          <Table.Th>Вид работ</Table.Th>
          <Table.Th>Объём</Table.Th>
          <Table.Th>Исполнитель</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {entries.map((entry) => (
          <Table.Tr key={entry.id}>
            <Table.Td>{formatDisplayDate(entry.completedAt)}</Table.Td>
            <Table.Td>{entry.workTypeName}</Table.Td>
            <Table.Td>{formatVolume(entry.volume, entry.unit)}</Table.Td>
            <Table.Td>{entry.executorName}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
