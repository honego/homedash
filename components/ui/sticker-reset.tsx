'use client'

export function StickerReset({ visible, onReset }: { visible: boolean; onReset: () => void }) {
  return (
    <div className="absolute right-0 -bottom-1 z-40 sm:right-4 sm:-bottom-3">
      <button
        type="button"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        disabled={!visible}
        onClick={onReset}
        className={`inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1.5 font-medium text-[12px] text-muted-subtle transition-all duration-300 hover:text-stone-700 dark:hover:text-stone-200 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1 opacity-0'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3"
          aria-hidden="true"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        归位
      </button>
    </div>
  )
}
