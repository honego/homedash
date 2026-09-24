import { Navigation } from './navigation'
import type { ReactNode } from 'react'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-4 flex min-h-svh max-w-2xl flex-col pt-12 pb-12 antialiased sm:mx-auto md:flex-row">
      <main className="flex min-w-0 flex-auto flex-col px-2 pt-8 md:px-0">{children}</main>
      <Navigation />
    </div>
  )
}
