import { siteConfig } from '@/config/site'
import { stickers } from '@/config/stickers'
import { StickerPlayground } from '@/components/ui/sticker-playground'
import { HomeIntro } from './intro'

export function Home() {
  return (
    <section className="flex flex-1 flex-col transition-transform duration-500 ease-out sm:translate-x-2 sm:px-16 sm:pt-6 md:translate-x-8">
      <header className="flex flex-col">
        <h1 className="font-medium tracking-tighter">{siteConfig.home.name}</h1>
        <p className="font-medium text-[13px] text-muted-subtle tracking-tight">{siteConfig.home.tagline}</p>
      </header>
      <HomeIntro />
      <div className="relative min-h-[300px] flex-1 sm:min-h-[340px]">
        <StickerPlayground stickers={stickers} />
      </div>
    </section>
  )
}
