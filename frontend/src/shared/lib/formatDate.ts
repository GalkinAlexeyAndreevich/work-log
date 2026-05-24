import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export function formatDisplayDate(isoDate: string): string {
  return dayjs(isoDate).format('DD.MM.YYYY')
}

export function toIsoDate(date: Date | string): string {
  return dayjs(date).format('YYYY-MM-DD')
}
