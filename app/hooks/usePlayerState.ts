import { useState, useRef, useEffect } from "react";
import songs from "../data/songs";

// ─── All player state and refs in one place ──────────────────────────────────
export function usePlayerState() {
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [isPlaying,   setIsPlaying]     = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration,    setDuration]    = useState<number>(0);
  const [volume,      setVolume]      = useState<number>(70);
  const [shuffle,     setShuffle]     = useState<boolean>(false);
  const [repeat,      setRepeat]      = useState<boolean>(false);
  const [search,      setSearch]      = useState<string>("");
  const [liked,       setLiked]       = useState<number[]>([]);
  const [showQueue,   setShowQueue]   = useState<boolean>(false);

  //load from localstorage
  useEffect(() => {
    const savedSong = localStorage.getItem("selectedSongIndex");
    if (savedSong !== null) {
      const index = parseInt(savedSong, 10);
      if (!Number.isNaN(index) && index >= 0 && index < songs.length) {
        setCurrentSong(index);
      }
    }

    const savedLiked = localStorage.getItem("likedSongs");
    if (savedLiked) {
      try {
        setLiked(JSON.parse(savedLiked));
      } catch {
        setLiked([]);
      }
    }
  }, []);

  //save to localstorage
  useEffect(() => {
    localStorage.setItem("selectedSongIndex", String(currentSong));
  }, [currentSong]);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(liked));
  }, [liked]);

  // ── Refs ──────────────────────────────────────────────────────────────────
  const audioRef    = useRef<HTMLAudioElement>(null);
  const startXRef   = useRef<number | null>(null);
  const dragging    = useRef<boolean>(false);

  return {
    // state values
    currentSong,  setCurrentSong,
    isPlaying,    setIsPlaying,
    currentTime,  setCurrentTime,
    duration,     setDuration,
    volume,       setVolume,
    shuffle,      setShuffle,
    repeat,       setRepeat,
    search,       setSearch,
    liked,        setLiked,
    showQueue,    setShowQueue,
    // refs
    audioRef,
    startXRef,
    dragging,
  };
}

// ─── Export the return type so other hooks can use it ────────────────────────
export type PlayerState = ReturnType<typeof usePlayerState>;