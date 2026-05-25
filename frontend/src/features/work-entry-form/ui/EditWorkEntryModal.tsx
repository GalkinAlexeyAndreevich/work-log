import { Modal } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import type { CreateWorkEntryDto, WorkEntry } from '@/entities/work-entry'
import { useUpdateWorkEntry } from '@/entities/work-entry'
import { workEntryToFormValues } from '@/features/work-entry-form/model/mappers'
import { WorkEntryForm } from '@/features/work-entry-form/ui/WorkEntryForm'

type EditWorkEntryModalProps = {
  entry: WorkEntry | null
  onClose: () => void
}

export function EditWorkEntryModal({ entry, onClose }: EditWorkEntryModalProps) {
  const { mutateAsync: updateEntry, isPending } = useUpdateWorkEntry()
  const opened = entry !== null

  const handleSubmit = async (dto: CreateWorkEntryDto) => {
    if (!entry) {
      return
    }

    try {
      await updateEntry({ id: entry.id, dto })
      notifications.show({
        title: 'Запись обновлена',
        message: 'Изменения сохранены',
        color: 'green',
      })
      onClose()
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось обновить запись',
        color: 'red',
      })
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Редактировать запись"
      size="lg"
    >
      {entry && (
        <WorkEntryForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isPending}
          initialValues={workEntryToFormValues(entry)}
          submitLabel="Сохранить"
          resetOnSubmit={false}
        />
      )}
    </Modal>
  )
}
