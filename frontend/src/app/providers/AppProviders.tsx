import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import 'dayjs/locale/ru'
import { queryClient } from '@/shared/lib/query-client'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="light">
        <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 1 }}>
          <Notifications position="top-right" />
          {children}
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
