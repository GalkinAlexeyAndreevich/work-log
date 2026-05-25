import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { CreateWorkEntryDto } from '@/entities/work-entry'
import { useCreateWorkType, useWorkTypes } from '@/entities/work-type'
import { prepareWorkEntry } from '@/features/add-work-entry/model/prepareWorkEntry'
import {
  type WorkEntryFormValues,
  workEntryFormSchema,
} from '@/features/add-work-entry/model/schema'

const defaultValues: WorkEntryFormValues = {
  completedAt: new Date(),
  workTypeId: '',
  volume: 1,
  unit: 'м³',
  executorName: '',
}

type WorkEntryFormProps = {
  onSubmit: (entry: CreateWorkEntryDto) => Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
  initialValues?: WorkEntryFormValues
  submitLabel?: string
  resetOnSubmit?: boolean
}

export function WorkEntryForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialValues = defaultValues,
  submitLabel = 'Добавить запись',
  resetOnSubmit = true,
}: WorkEntryFormProps) {
  const [newWorkTypeName, setNewWorkTypeName] = useState('')
  const [isWorkTypeModalOpened, workTypeModalHandlers] = useDisclosure(false)
  const { data: workTypes = [], isLoading: isWorkTypesLoading } = useWorkTypes()
  const {
    mutateAsync: createWorkType,
    isPending: isWorkTypeCreating
  } = useCreateWorkType()

  const workTypeOptions = useMemo(
    () =>
      workTypes.map((workType) => ({
        value: workType.id,
        label: workType.name,
      })),
    [workTypes],
  )

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<WorkEntryFormValues>({
    resolver: zodResolver(workEntryFormSchema),
    defaultValues: initialValues,
  })

  const submit = handleSubmit(async (values) => {
    await onSubmit(prepareWorkEntry(values))
    if (resetOnSubmit) {
      reset(defaultValues)
    }
  })

  const handleCreateWorkType = async () => {
    const trimmedName = newWorkTypeName.trim()
    if (!trimmedName) {
      notifications.show({
        title: 'Ошибка',
        message: 'Введите название вида работ',
        color: 'red',
      })
      return
    }

    try {
      const created = await createWorkType({ name: trimmedName })
      setValue('workTypeId', created.id, {
        shouldValidate: true,
        shouldDirty: true,
      })
      setNewWorkTypeName('')
      workTypeModalHandlers.close()
      notifications.show({
        title: 'Вид работ добавлен',
        message: 'Новый тип доступен для выбора',
        color: 'green',
      })
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось добавить вид работ',
        color: 'red',
      })
    }
  }

  return (
    <>
      <form onSubmit={submit}>
        <Stack gap="md">
          <Controller
            name="completedAt"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                label="Дата выполнения"
                placeholder="Выберите дату"
                value={field.value}
                onChange={(value) => {
                  if (value) {
                    field.onChange(new Date(value))
                  }
                }}
                onBlur={field.onBlur}
                error={errors.completedAt?.message}
                required
                valueFormat="DD.MM.YYYY"
              />
            )}
          />

          <Controller
            name="workTypeId"
            control={control}
            render={({ field }) => (
              <Select
                label="Вид работ"
                placeholder="Выберите вид работ"
                data={workTypeOptions}
                value={field.value || null}
                onChange={(value) => field.onChange(value ?? '')}
                onBlur={field.onBlur}
                error={errors.workTypeId?.message}
                searchable
                nothingFoundMessage="Ничего не найдено"
                allowDeselect={false}
                disabled={isWorkTypesLoading}
                required
              />
            )}
          />

          <Group justify="flex-start">
            <Button
              variant="light"
              size="xs"
              leftSection={<IconPlus size={14} />}
              onClick={workTypeModalHandlers.open}
              type="button"
            >
              Добавить вид работ
            </Button>
          </Group>

          <Group grow align="flex-start">
            <Controller
              name="volume"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Объём"
                  placeholder="0"
                  min={0}
                  decimalScale={2}
                  value={field.value}
                  onChange={(value) => field.onChange(Number(value) || 0)}
                  onBlur={field.onBlur}
                  error={errors.volume?.message}
                  required
                />
              )}
            />

            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Единица измерения"
                  placeholder="м³, м², шт"
                  error={errors.unit?.message}
                  required
                />
              )}
            />
          </Group>

          <Controller
            name="executorName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Исполнитель"
                placeholder="ФИО бригадира / работника"
                error={errors.executorName?.message}
                required
              />
            )}
          />

          <Group justify="flex-end">
            {onCancel && (
              <Button variant="default" onClick={onCancel} type="button">
                Отмена
              </Button>
            )}
            <Button type="submit" loading={isFormSubmitting || isSubmitting}>
              {submitLabel}
            </Button>
          </Group>
        </Stack>
      </form>

      <Modal
        opened={isWorkTypeModalOpened}
        onClose={workTypeModalHandlers.close}
        title="Добавить вид работ"
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="Название вида работ"
            placeholder="Например, Монтаж вентиляции"
            value={newWorkTypeName}
            onChange={(event) => setNewWorkTypeName(event.currentTarget.value)}
            required
          />
          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={workTypeModalHandlers.close}
              type="button"
            >
              Отмена
            </Button>
            <Button
              onClick={handleCreateWorkType}
              loading={isWorkTypeCreating}
              type="button"
            >
              Добавить
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  )
}
