import Image from 'next/image'

type Brand = {
  label: string
  url: string
  icon: string
  darkIcon?: string
}

export function InlineBrandLink({ brand }: { brand: Brand }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      <Image
        src={brand.icon}
        alt=""
        width={14}
        height={14}
        className={`size-3.5 ${brand.darkIcon ? 'dark:hidden' : ''}`}
      />
      {brand.darkIcon ? (
        <Image src={brand.darkIcon} alt="" width={14} height={14} className="hidden size-3.5 dark:block" />
      ) : null}
      <a
        href={brand.url}
        target="_blank"
        rel="noreferrer"
        className="text-black underline decoration-1 decoration-black/20 underline-offset-3 opacity-90 dark:text-white dark:decoration-white/20"
      >
        {brand.label}
      </a>
    </span>
  )
}
