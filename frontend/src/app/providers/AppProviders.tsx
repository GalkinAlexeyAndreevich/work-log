import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import type { ReactNode } from 'react'
import 'dayjs/locale/ru'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MantineProvider defaultColorScheme="light">
      <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 1 }}>
        {children}
      </DatesProvider>
    </MantineProvider>
  )
}
