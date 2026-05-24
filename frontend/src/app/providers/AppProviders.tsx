import { MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
}
