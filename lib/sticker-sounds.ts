type StickerSound = 'tick' | 'release' | 'cat' | 'sparkle'

const sources: Record<StickerSound, { src: string; volume: number }> = {
  tick: { src: '/sound/tick.wav', volume: 1 },
  release: { src: '/sound/release.wav', volume: 1 },
  cat: { src: '/sound/cat.mp3', volume: 0.15 },
  sparkle: { src: '/sound/sparkle.wav', volume: 1 },
}

const audioCache = new Map<StickerSound, HTMLAudioElement>()

export function playStickerSound(sound: StickerSound) {
  const { src, volume } = sources[sound]
  let audio = audioCache.get(sound)
  if (!audio) {
    audio = new Audio(src)
    audio.preload = 'auto'
    audio.volume = volume
    audioCache.set(sound, audio)
  }
  audio.pause()
  audio.currentTime = 0
  void audio.play().catch(() => {})
}
