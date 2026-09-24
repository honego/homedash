'use client'

import { clampStickerPosition, type StickerDefinition, type StickerPosition } from '@/lib/stickers'
import { useDrag } from '@use-gesture/react'
import Image from 'next/image'
import { memo, useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'

type DraggableStickerProps = {
  sticker: StickerDefinition
  position: StickerPosition
  resetting: boolean
  getPosition: (id: string) => StickerPosition
  bringToFront: (id: string) => void
  move: (id: string, position: Pick<StickerPosition, 'x' | 'y'>) => void
  finish: () => void
}

export const DraggableSticker = memo(function DraggableSticker({
  sticker,
  position,
  resetting,
  getPosition,
  bringToFront,
  move,
  finish,
}: DraggableStickerProps) {
  const element = useRef<HTMLButtonElement>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [dragging, setDragging] = useState(false)
  const [settling, setSettling] = useState(false)
  const [tilt, setTilt] = useState(0)
  const [grab, setGrab] = useState({ x: 50, y: 58 })

  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current)
    },
    [],
  )

  const bind = useDrag(
    ({ first, last, dragging: active, offset: [x, y], delta: [deltaX], xy: [pointerX, pointerY] }) => {
      if (!element.current) return

      if (first) {
        if (settleTimer.current) clearTimeout(settleTimer.current)
        const rect = element.current.getBoundingClientRect()
        setGrab({
          x: Math.max(0, Math.min(100, ((pointerX - rect.left) / rect.width) * 100)),
          y: Math.max(0, Math.min(100, ((pointerY - rect.top) / rect.height) * 100)),
        })
        bringToFront(sticker.id)
        setSettling(false)
        setDragging(true)
      }

      if (active) {
        const bounded = clampStickerPosition(element.current, { x, y }, getPosition(sticker.id))
        move(sticker.id, bounded)
        setTilt(Math.max(-8, Math.min(8, deltaX * 0.35)))
      }

      if (last) {
        setDragging(false)
        setSettling(true)
        setTilt(0)
        finish()
        settleTimer.current = setTimeout(() => setSettling(false), 380)
      }
    },
    {
      from: () => {
        const current = getPosition(sticker.id)
        return [current.x, current.y]
      },
      filterTaps: true,
      preventScroll: true,
      pointer: { touch: true },
    },
  )

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-16, 0],
      ArrowRight: [16, 0],
      ArrowUp: [0, -16],
      ArrowDown: [0, 16],
    }
    const direction = directions[event.key]
    if (!direction || !element.current) return
    event.preventDefault()
    bringToFront(sticker.id)
    const current = getPosition(sticker.id)
    move(
      sticker.id,
      clampStickerPosition(element.current, { x: current.x + direction[0], y: current.y + direction[1] }, current),
    )
    finish()
  }

  const style = {
    '--enter-delay': `${sticker.enterDelay}ms`,
    '--rest-rotate': `${sticker.rotation}deg`,
    '--sticker-offset-x': `${sticker.desktop.x}px`,
    '--sticker-offset-y': `${sticker.desktop.y}px`,
    '--sticker-left-mobile': `${sticker.mobile.left}%`,
    '--sticker-top-mobile': `${sticker.mobile.top}%`,
    '--sticker-width': `${sticker.desktop.width}px`,
    '--sticker-width-mobile': `${sticker.mobile.width}px`,
    '--sticker-mask': `url("${sticker.image}")`,
    '--sticker-shadow-src': `url("${sticker.shadow}")`,
    '--sticker-shadow-inset': sticker.shadowInset,
    '--drag-tilt': `${tilt}deg`,
    '--grab-x': `${grab.x}%`,
    '--grab-y': `${grab.y}%`,
    zIndex: position.zIndex,
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  } as CSSProperties

  return (
    <button
      {...bind()}
      ref={element}
      type="button"
      aria-label={`拖动 ${sticker.id} 贴纸`}
      title={`拖动 ${sticker.id} 贴纸`}
      className="sticker-shell sticker-shell-image"
      data-sticker-id={sticker.id}
      data-dragging={dragging}
      data-settling={settling}
      data-resetting={resetting}
      onKeyDown={onKeyDown}
      style={style}
    >
      <span className="sticker-enter">
        <span className="sticker-lift">
          <span className="sticker-bob">
            <span className="sticker-bend">
              <span className="sticker-art sticker-art-image">
                <Image
                  alt={sticker.id}
                  src={sticker.image}
                  width={sticker.imageWidth}
                  height={sticker.imageHeight}
                  className="sticker-image"
                  draggable={false}
                  priority
                />
                <span className="sticker-crease" />
              </span>
            </span>
          </span>
        </span>
      </span>
    </button>
  )
})
