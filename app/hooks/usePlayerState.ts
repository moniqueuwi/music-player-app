import { useState, useRef, useEffect } from "react";
import songs from "../data/songs";

/*=========================ALL PLAYER STATE AND REF=========================*/
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

  /*=========================LOAD FROM LOCALSTORAGE=========================*/
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

  /*=========================SAVE TO LOCALSTORAGE=========================*/
  useEffect(() => {
    localStorage.setItem("selectedSongIndex", String(currentSong));
  }, [currentSong]);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(liked));
  }, [liked]);

  /*=========================REF=========================*/
  const audioRef    = useRef<HTMLAudioElement>(null);
  const startXRef   = useRef<number | null>(null);
  const dragging    = useRef<boolean>(false);

  return {
    /*=========================STATE VALUES=========================*/
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
    /*=========================REF=========================*/
    audioRef,
    startXRef,
    dragging,
  };
}

/*=========================RETURN TYPE=========================*/
export type PlayerState = ReturnType<typeof usePlayerState>;