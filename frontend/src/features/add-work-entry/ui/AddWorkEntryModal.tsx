import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons-react'
import type { CreateWorkEntryDto } from '@/entities/work-entry'
import { useCreateWorkEntry } from '@/entities/work-entry'
import { WorkEntryForm } from '@/features/add-work-entry/ui/WorkEntryForm'

export function AddWorkEntryModal() {
  const [opened, { open, close }] = useDisclosure(false)
  const { mutateAsync, isPending } = useCreateWorkEntry()

  const handleSubmit = async (entry: CreateWorkEntryDto) => {
    try {
      await mutateAsync(entry)
      notifications.show({
        title: 'Запись добавлена',
        message: 'Работа зафиксирована в журнале',
        color: 'green',
      })
      close()
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось сохранить запись',
        color: 'red',
      })
    }
  }

  return (
    <>
      <Button leftSection={<IconPlus size={16} />} onClick={open}>
        Добавить запись
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Новая запись"
        size="lg"
      >
        {opened && (
          <WorkEntryForm
            onSubmit={handleSubmit}
            onCancel={close}
            isSubmitting={isPending}
          />
        )}
      </Modal>
    </>
  )
}
