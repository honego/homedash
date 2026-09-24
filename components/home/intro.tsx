import { InlineBrandLink } from '@/components/ui/inline-brand-link'
import { siteConfig } from '@/config/site'

export function HomeIntro() {
  const home = siteConfig.home

  return (
    <section className="flex flex-col pt-6 font-[450] text-[14px] tracking-tight">
      <div className="mb-6">
        <div className="text-md text-muted-subtle">
          {home.greeting}{' '}
          <a
            href={home.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="mx-0.5 font-medium text-black opacity-90 dark:text-white"
          >
            {home.name}
          </a>
          <span className="hidden sm:inline">，{home.openSource}</span>
        </div>
        <div className="text-md text-muted-subtle sm:hidden">{home.openSource}</div>
        <div className="text-md text-muted-subtle">{home.passion}</div>
        <div className="mt-4 flex flex-wrap gap-1 text-md text-muted-subtle">
          {home.rolePrefix} <InlineBrandLink brand={home.brands.nezha} />
          {home.roleMiddle} <InlineBrandLink brand={home.brands.dashboard} /> {home.roleSuffix}
        </div>
      </div>
    </section>
  )
}
