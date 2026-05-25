import { Container, Group, Modal, Paper, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useMemo, useState } from 'react'
import {
  type UpdateWorkEntryDto,
  type WorkEntry,
  useDeleteWorkEntry,
  useUpdateWorkEntry,
  useWorkEntries,
} from '@/entities/work-entry'
import { useWorkTypes } from '@/entities/work-type'
import {
  AddWorkEntryModal,
  WorkEntryForm,
  type WorkEntryFormValues,
} from '@/features/add-work-entry'
import { WorkLogTable } from '@/widgets/work-log-table'

export function WorkLogPage() {
  const { data: entries = [], isLoading, isError } = useWorkEntries()
  const { data: workTypes = [] } = useWorkTypes()
  const [selectedEntry, setSelectedEntry] = useState<WorkEntry | null>(null)
  const [isEditOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false)
  const { mutateAsync: deleteEntry, isPending, variables } = useDeleteWorkEntry()
  const {
    mutateAsync: updateEntry,
    isPending: isUpdating,
  } = useUpdateWorkEntry()
  const workTypeNamesById = useMemo(
    () =>
      Object.fromEntries(workTypes.map((workType) => [workType.id, workType.name])),
    [workTypes],
  )

  const mapEntryToFormValues = (entry: WorkEntry): WorkEntryFormValues => ({
    completedAt: new Date(entry.completedAt),
    workTypeId: entry.workTypeId,
    volume: entry.volume,
    unit: entry.unit,
    executorName: entry.executorName,
  })

  const handleEditClick = (entry: WorkEntry) => {
    setSelectedEntry(entry)
    openEditModal()
  }

  const handleEditSubmit = async (dto: UpdateWorkEntryDto) => {
    if (!selectedEntry) {
      return
    }

    try {
      await updateEntry({ id: selectedEntry.id, dto })
      notifications.show({
        title: 'Запись обновлена',
        message: 'Изменения сохранены',
        color: 'green',
      })
      closeEditModal()
      setSelectedEntry(null)
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось обновить запись',
        color: 'red',
      })
    }
  }

  const handleEditClose = () => {
    closeEditModal()
    setSelectedEntry(null)
  }

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
              onEdit={handleEditClick}
              onDelete={handleDelete}
              deletingEntryId={isPending ? variables : undefined}
            />
          </Stack>
        </Paper>
      </Stack>

      <Modal
        opened={isEditOpened}
        onClose={handleEditClose}
        title="Редактировать запись"
        size="lg"
      >
        {selectedEntry && (
          <WorkEntryForm
            onSubmit={handleEditSubmit}
            onCancel={handleEditClose}
            isSubmitting={isUpdating}
            initialValues={mapEntryToFormValues(selectedEntry)}
            submitLabel="Сохранить"
            resetOnSubmit={false}
          />
        )}
      </Modal>
    </Container>
  )
}
