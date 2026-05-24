import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Group,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Controller, useForm } from 'react-hook-form'
import type { CreateWorkEntryDto } from '@/entities/work-entry'
import { prepareWorkEntry } from '@/features/add-work-entry/model/prepareWorkEntry'
import {
  addWorkEntrySchema,
  type AddWorkEntryFormValues,
} from '@/features/add-work-entry/model/schema'

const defaultValues: AddWorkEntryFormValues = {
  completedAt: new Date(),
  workTypeName: '',
  volume: 1,
  unit: 'м³',
  executorName: '',
}

type AddWorkEntryFormProps = {
  onSubmit: (entry: CreateWorkEntryDto) => void
  onCancel?: () => void
}

export function AddWorkEntryForm({ onSubmit, onCancel }: AddWorkEntryFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddWorkEntryFormValues>({
    resolver: zodResolver(addWorkEntrySchema),
    defaultValues,
  })

  const submit = handleSubmit((values) => {
    onSubmit(prepareWorkEntry(values))
    reset(defaultValues)
  })

  return (
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
          name="workTypeName"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Вид работ"
              placeholder="Например, кладка перегородок"
              error={errors.workTypeName?.message}
              required
            />
          )}
        />

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
          <Button type="submit" loading={isSubmitting}>
            Добавить запись
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
