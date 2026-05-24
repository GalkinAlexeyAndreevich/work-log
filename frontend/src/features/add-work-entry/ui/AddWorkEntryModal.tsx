import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import type { CreateWorkEntryDto } from '@/entities/work-entry'
import { AddWorkEntryForm } from '@/features/add-work-entry/ui/AddWorkEntryForm'

type AddWorkEntryModalProps = {
  onSubmit: (entry: CreateWorkEntryDto) => void
}

export function AddWorkEntryModal({ onSubmit }: AddWorkEntryModalProps) {
  const [opened, { open, close }] = useDisclosure(false)

  const handleSubmit = (entry: CreateWorkEntryDto) => {
    onSubmit(entry)
    close()
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
          <AddWorkEntryForm onSubmit={handleSubmit} onCancel={close} />
        )}
      </Modal>
    </>
  )
}
