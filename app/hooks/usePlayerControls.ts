import { useCallback } from "react";
import songs from "../data/songs";
import type { PlayerState } from "./usePlayerState";

// ─── All playback control functions ─────────────────────────────────────────
export function usePlayerControls(state: PlayerState) {
  const {
    shuffle,
    currentSong,
    setCurrentSong,
    setCurrentTime,
    setIsPlaying,
    liked,
    setLiked,
    audioRef,
  } = state;

  // ── Play / Pause ──────────────────────────────────────────────────────────
  function togglePlay(): void {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  // ── Next song (respects shuffle) ──────────────────────────────────────────
  const handleNext = useCallback(() : void => {
    setCurrentSong(prev => 
      shuffle
        ? Math.floor(Math.random() * songs.length)
        : (prev +1) % songs.length
    );
  }, [shuffle, setCurrentSong]);

  // ── Previous song ─────────────────────────────────────────────────────────
  function handlePrev() : void {
    setCurrentSong(prev => (prev - 1 + songs.length) % songs.length);
  }

  // ── Seek to position ─────────────────────────────────────────────────────
  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) : void {
    const val = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = val;
    setCurrentTime(val);
  }

  // ── Toggle like for current song ─────────────────────────────────────────
  function toggleLike() : void {
    const id = songs[currentSong].id;
    setLiked((prev: number[]) => 
      prev.includes(id)
        ? prev.filter((x: number) => x !== id)
        : [...prev, id]
    );
  }

  return { togglePlay, handleNext, handlePrev, handleSeek, toggleLike };
}

// ─── Export return type for use in player.tsx ────────────────────────────────
export type PlayerControls = ReturnType<typeof usePlayerControls>;