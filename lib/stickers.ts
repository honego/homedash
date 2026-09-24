export type StickerDefinition = {
  id: string
  image: string
  shadow: string
  imageWidth: number
  imageHeight: number
  desktop: { x: number; y: number; width: number }
  mobile: { left: number; top: number; width: number }
  rotation: number
  zIndex: number
  shadowInset: string
  enterDelay: number
}

export type StickerPosition = { x: number; y: number; zIndex: number }

export function clampStickerPosition(
  element: HTMLElement,
  position: Pick<StickerPosition, 'x' | 'y'>,
  current: Pick<StickerPosition, 'x' | 'y'>,
) {
  const playground = element.closest('.sticker-playground')
  if (!playground) return position

  const rect = element.getBoundingClientRect()
  const area = playground.getBoundingClientRect()
  const page = document.body.getBoundingClientRect()
  const inset = Math.min(33, Math.max(area.width / 2 - 1, 0))
  const left = area.left + inset
  const right = area.right - inset
  const top = Math.min(page.top, area.top)
  const bottom = Math.max(page.bottom, area.bottom)
  const originX = rect.left - current.x
  const originY = rect.top - current.y

  return {
    x: Math.min(Math.max(position.x, left - originX), right - rect.width - originX),
    y: Math.min(Math.max(position.y, top - originY), bottom - rect.height - originY),
  }
}
