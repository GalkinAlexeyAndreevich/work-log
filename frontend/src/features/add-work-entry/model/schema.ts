import { z } from 'zod'

export const addWorkEntrySchema = z.object({
  completedAt: z.date({ message: 'Укажите дату' }),
  workTypeName: z.string().trim().min(1, 'Укажите вид работ'),
  volume: z.number().positive('Объём должен быть больше 0'),
  unit: z.string().trim().min(1, 'Укажите единицу измерения'),
  executorName: z.string().trim().min(1, 'Укажите исполнителя'),
})

export type AddWorkEntryFormValues = z.infer<typeof addWorkEntrySchema>
