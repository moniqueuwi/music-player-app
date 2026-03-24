import "../styles/player.css";
import songs from "../data/songs";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { usePlayerState } from "../hooks/usePlayerState";
import { usePlayerControls } from "~/hooks/usePlayerControls";
import { useSwipe } from "~/hooks/useSwipe";
import { formatTime } from "~/hooks/formatTime";
import Navbar from "../components/Navbar";
import VolumeControl from "../components/VolumeControl";
import QueueOverlay from "../components/QueueOverlay";

export default function Player() {
  //===========HOOKS==========
  const state     = usePlayerState();
  useAudioPlayer(state);
  const controls  = usePlayerControls(state);
  const swipe     = useSwipe(state, controls.handleNext, controls.handlePrev);

  //===========DERIVED VALUES==========
  const {
    currentSong,    setCurrentSong,
    isPlaying,
    currentTime,
    duration,
    volume,         setVolume,
    shuffle,        setShuffle,
    repeat,         setRepeat,
    search,         setSearch,
    liked,
    showQueue,      setShowQueue,
    audioRef,
  } = state;

  const { togglePlay, handleNext, handlePrev, handleSeek, toggleLike } = controls;

  const song      = songs[currentSong];
  const progress  = duration > 0 ? currentTime / duration : 0;
  const isLiked   = liked.includes(song.id);

  return (
    <>
      <div id="mobile">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        {/* Navbar */}
        <Navbar search={search} setSearch={setSearch}/>

        {/* Player */}
        <div className="player">

          {/* album cover */}
          <div 
            className="album-wrapper"
            onClick={togglePlay}
            onMouseDown={swipe.onMouseDown}
            onMouseUp={swipe.onMouseUp}
            onTouchStart={swipe.onTouchStart}
            onTouchEnd={swipe.onTouchEnd}
          >
            <img
              aria-label="album cover"
              id="album-cover"
              src={song.album}
              className={`album-cover${isPlaying ? " spinning" : ""}`}
            />
          </div>

          {/* song info and like */}
          <div className="song-info-row">
            <div className="song-info-text">
              <div className="song-title" id="song-title">{song.title}</div>
              <div className="artist" id="artist">{song.artist}</div>
            </div>
            <button className={`like-btn${isLiked ? " liked" : ""}`} title={isLiked ? "Unliked" : "Liked"} onClick={toggleLike}>{isLiked ? "❤️" : "🤍"}</button>
          </div>          

          {/* seek bar */}
          <div className="seek-wrap">
            <input
              title="progress bar"
              type="range"
              className="seek-bar"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
            />
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* controls */}
          <div className="controls">
            <button className={`control-btn shuffle-btn${shuffle ? " active" : ""}`} title="shuffle" onClick={() => setShuffle(s => !s)}>
              <i className="fa-solid fa-shuffle"></i>
            </button>
            <button className="control-btn prev-btn" title="previous" onClick={handlePrev}>
              <i className="fa-solid fa-backward"></i>
            </button>
            <button className="control-btn play-btn" title={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
              <i className={`fa-solid${isPlaying ? " fa-pause" : " fa-play"}`}></i>
            </button>
            <button className="control-btn next-btn" title="next" onClick={handleNext}>
              <i className="fa-solid fa-forward"></i>
            </button>
            <button className={`control-btn repeat-btn${repeat ? " active" : ""}`} title="repeat" onClick={() => setRepeat(r => !r)}>
              <i className="fa-solid fa-repeat"></i>
            </button>
          </div>

          {/* volume control */}
          <VolumeControl volume={volume} setVolume={setVolume}/>
        </div>

        {/* up next toggle */}
        <div className="queue-section">
          <div className="queue-divider"></div>
          <div className="queue-header">
            <div className="queue-label">
              {search ? `Results for "${search}"` : "Up Next"}
            </div>
            <button className="queue-toggle-btn" title="show queue" onClick={() => setShowQueue(true)}>
              <i className="fa-solid fa-caret-down"></i>
            </button>
          </div>
        </div>

        {/* queue overlay */}
        {showQueue && (
          <QueueOverlay
            songs={songs}
            currentSongId={song.id}
            search={search}
            setCurrentSong={setCurrentSong}
            setShowQueue={setShowQueue}
          />
        )}

        <audio id="audio-player" ref={audioRef} preload="metadata" />

      </div>
    </>
  );
}