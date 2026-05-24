import { Table, Text } from '@mantine/core'
import type { WorkEntry } from '@/entities/work-entry'
import { formatDisplayDate } from '@/shared/lib/formatDate'
import { formatVolume } from '@/shared/lib/formatVolume'

type WorkLogTableProps = {
  entries: WorkEntry[]
}

export function WorkLogTable({ entries }: WorkLogTableProps) {
  if (entries.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        Записей пока нет
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
