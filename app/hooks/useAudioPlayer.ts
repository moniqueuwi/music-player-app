import { useEffect, useCallback } from "react";
import songs from "../data/songs";
import type { PlayerState } from "./usePlayerState";

// ─── Handles: load song, audio event listeners, sync volume, persist liked ───
export function useAudioPlayer(state: PlayerState) {
  const {
    currentSong, setCurrentSong,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    volume,
    repeat,
    liked,
    audioRef,
  } = state;

  // ── Load song whenever currentSong index changes ──────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = encodeURI(songs[currentSong].src || "");
    localStorage.setItem("selectedSongIndex", String(currentSong));

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [currentSong]);

  // ── Update metadata on loaded song ─────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [audioRef]);

  // ── handleNext defined here so onEnded can reference it ──────────────────
  const handleNext = useCallback(() => {
    setCurrentSong(prev => (prev + 1) % songs.length);
  }, [setCurrentSong]);

  // ── Audio event listeners ─────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate      =() => setCurrentTime(audio.currentTime);
    const onDurationChange  = () => setDuration(audio.duration || 0);
    const onPlay            = () => setIsPlaying(true);
    const onPause           = () => setIsPlaying(false);
    const onEnded           = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        handleNext();
      }
    };

    audio.addEventListener("timeupdate",      onTimeUpdate);
    audio.addEventListener("durationchange",  onDurationChange);
    audio.addEventListener("play",            onPlay);
    audio.addEventListener("pause",           onPause);
    audio.addEventListener("ended",           onEnded);

    return () => {
      audio.removeEventListener("timeupdate",      onTimeUpdate);
      audio.removeEventListener("durationchange",  onDurationChange);
      audio.removeEventListener("play",       onPlay);
      audio.removeEventListener("pause",      onPause);
      audio.removeEventListener("ended",      onEnded);
    };
  }, [repeat, handleNext]); 

  // ── Sync volume whenever it changes ──────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  // Persiet liked songs in localstorage
  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(liked));
  }, [liked]);
}