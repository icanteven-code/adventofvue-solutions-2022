import { usePlaylist } from '@/composables/usePlaylist'
import { useMediaControls } from '@vueuse/core'
import { nextTick, computed, ref } from 'vue'

const SKIP_STEP = 10;

const el = ref(document.createElement('AUDIO'))

const { current: currentTrack, state } = usePlaylist()
const { playing, currentTime, duration, volume } = useMediaControls(el, {
  src: currentTrack,
})

export function useCurrentTrack() {
  function play(song = null) {
    if (song) state.value = song
    playing.value = false
    nextTick(() => {
      playing.value = true
    })
  }

  function prettifyTime(time) {
    let seconds = Math.floor(time)
    let minutes = 0;

    if (seconds > 59) {
      minutes = Math.floor(seconds / 60)
      seconds -= minutes * 60
    }

    const minsStr = minutes >= 10 ? minutes : `0${minutes}`;
    const secsStr = seconds >= 10 ? seconds : `0${seconds}`;
    return `${minsStr}:${secsStr}`
  }

  const progress = computed(() => {
    return (currentTime.value / duration.value) * 100
  })

  function pause() {
    playing.value = false;
  }

  function ff() {
    if (currentTime.value >= duration.value) return
    const skippedTime = currentTime.value + SKIP_STEP;

    if (skippedTime < duration.value) {
      currentTime.value = skippedTime
    } else {
      currentTime.value = duration.value
    }
  }

  function rewind() {
    if (currentTime.value === 0) return

    if (currentTime.value < SKIP_STEP) {
      currentTime.value = 0
    } else {
      const skippedTime = currentTime.value - SKIP_STEP;
      currentTime.value = skippedTime
    }
  }

  const durationPretty = computed(() => {
    return prettifyTime(duration.value)
  })
  const currentTimePretty = computed(() => {
    return prettifyTime(currentTime.value)
  })

  const timeDisplay = computed(() => {
    return `${currentTimePretty.value} - ${durationPretty.value}`
  })

  return {
    pause,
    play,
    ff,
    rewind,
    timeDisplay,
    progress,
    currentTrack,
    playing,
    currentTime,
    duration,
    volume,
  }
}
