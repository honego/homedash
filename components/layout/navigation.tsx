'use client'

import { siteConfig } from '@/config/site'
import { HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const icons = { home: HomeIcon }

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex flex-col items-center">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 top-gradient-overlay h-24" />
      <div className="pt-1" />
      <nav className="relative mt-2 flex items-center gap-2 px-2 py-1" aria-label="主导航">
        {siteConfig.navigation.map((item) => {
          const Icon = icons[item.icon]
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`relative-link relative rounded-md px-2.5 py-2 font-medium text-[12px]
                transition-all duration-200 md:text-[13px] ${
                  active
                    ? 'text-black dark:text-white'
                    : 'text-muted-subtle hover:text-stone-700 dark:hover:text-stone-200'
                }`}
            >
              <span className="relative z-30 flex items-center gap-1">
                <Icon className="h-4 w-4 shrink-0 sm:hidden" />
                <span className="hidden sm:block">{item.label}</span>
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
