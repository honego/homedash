'use client'

import '@/styles/stickers.css'
import { clampStickerPosition, type StickerDefinition, type StickerPosition } from '@/lib/stickers'
import { playStickerSound } from '@/lib/sticker-sounds'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DraggableSticker } from './draggable-sticker'
import { StickerReset } from './sticker-reset'

const storageKey = 'homedash-sticker-positions:v1'

function initialPositions(stickers: readonly StickerDefinition[]): Record<string, StickerPosition> {
  return Object.fromEntries(stickers.map((sticker) => [sticker.id, { x: 0, y: 0, zIndex: sticker.zIndex }]))
}

export function StickerPlayground({ stickers }: { stickers: readonly StickerDefinition[] }) {
  const [positions, setPositions] = useState(() => initialPositions(stickers))
  const positionsRef = useRef(positions)
  const [resetting, setResetting] = useState(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const setPositionMap = useCallback((next: Record<string, StickerPosition>) => {
    positionsRef.current = next
    setPositions(next)
  }, [])

  const getPosition = useCallback((id: string) => positionsRef.current[id], [])

  const bringToFront = useCallback(
    (id: string) => {
      const current = positionsRef.current
      const highest = Math.max(...Object.values(current).map((position) => position.zIndex))
      setPositionMap({ ...current, [id]: { ...current[id], zIndex: highest + 1 } })
    },
    [setPositionMap],
  )

  const move = useCallback(
    (id: string, point: Pick<StickerPosition, 'x' | 'y'>) => {
      const current = positionsRef.current
      setPositionMap({ ...current, [id]: { ...current[id], ...point } })
    },
    [setPositionMap],
  )

  const finish = useCallback(() => {
    try {
      const saved = Object.fromEntries(Object.entries(positionsRef.current).map(([id, { x, y }]) => [id, { x, y }]))
      localStorage.setItem(storageKey, JSON.stringify(saved))
    } catch {
      // Dragging still works when local storage is unavailable.
    }
  }, [])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}') as Record<string, { x?: number; y?: number }>
      const current = positionsRef.current
      let changed = false
      const next = { ...current }
      for (const sticker of stickers) {
        const point = saved[sticker.id]
        if (
          !point ||
          typeof point.x !== 'number' ||
          typeof point.y !== 'number' ||
          !Number.isFinite(point.x) ||
          !Number.isFinite(point.y)
        )
          continue
        const element = document.querySelector<HTMLElement>(`[data-sticker-id="${sticker.id}"]`)
        if (!element) continue
        const bounded = clampStickerPosition(element, { x: point.x, y: point.y }, current[sticker.id])
        next[sticker.id] = { ...current[sticker.id], ...bounded }
        changed = true
      }
      if (changed) setPositionMap(next)
    } catch {
      // A malformed or blocked store should not stop the homepage.
    }
  }, [setPositionMap, stickers])

  useEffect(() => {
    const clampOnResize = () => {
      const current = positionsRef.current
      const next = { ...current }
      let changed = false
      for (const sticker of stickers) {
        const element = document.querySelector<HTMLElement>(`[data-sticker-id="${sticker.id}"]`)
        if (!element) continue
        const bounded = clampStickerPosition(element, current[sticker.id], current[sticker.id])
        if (bounded.x === current[sticker.id].x && bounded.y === current[sticker.id].y) continue
        next[sticker.id] = { ...current[sticker.id], ...bounded }
        changed = true
      }
      if (changed) setPositionMap(next)
    }

    window.addEventListener('resize', clampOnResize)
    return () => window.removeEventListener('resize', clampOnResize)
  }, [setPositionMap, stickers])

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current)
    },
    [],
  )

  function reset() {
    playStickerSound('sparkle')
    if (resetTimer.current) clearTimeout(resetTimer.current)
    setResetting(true)
    setPositionMap(initialPositions(stickers))
    try {
      localStorage.removeItem(storageKey)
    } catch {
      // The visible reset still works when local storage is unavailable.
    }
    resetTimer.current = setTimeout(() => setResetting(false), 560)
  }

  const hasMoved = stickers.some((sticker) => {
    const position = positions[sticker.id]
    return position.x !== 0 || position.y !== 0 || position.zIndex !== sticker.zIndex
  })

  return (
    <>
      <section aria-label="可拖拽贴纸区" className="sticker-playground">
        {stickers.map((sticker) => (
          <DraggableSticker
            key={sticker.id}
            sticker={sticker}
            position={positions[sticker.id]}
            resetting={resetting}
            getPosition={getPosition}
            bringToFront={bringToFront}
            move={move}
            finish={finish}
          />
        ))}
      </section>
      <StickerReset visible={hasMoved} onReset={reset} />
    </>
  )
}
