import "../styles/QueueOverlay.css";
import type { Song } from "../data/songs";

// QueueOverlay component
type QueueOverlayProps = {
  songs: Song[],
  currentSongId: number;
  search: string;
  setCurrentSong: (id: number) => void;
  setShowQueue: (val: boolean) => void;
};

export default function QueueOverlay({
  songs,
  currentSongId,
  search,
  setCurrentSong,
  setShowQueue,
}: QueueOverlayProps) {
  const filtered = songs.filter(s =>
    !search ||
    s.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
    s.artist.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className="queue-overlay" onClick={e => {if (e.target === e.currentTarget) setShowQueue(false)}}>
      <div className="queue-sheet">
        {/* Drag handle */}
        <div className="queue-sheet-handle"></div>

        {/* header */}
        <div className="queue-sheet-header">
          <div className="display">
            <span className="queue-sheet-title">Up Next</span>
            <span className="queue-sheet-count">{songs.length} songs</span>
          </div>
          <button className="queue-close-btn" title="Close" onClick={() => setShowQueue(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* song list */}
        <div className="queue-sheet-list">
          {filtered.length === 0 ? (
            <div className="queue-empty">No songs found in this queue.</div>
          ) : (
            filtered.map((s) => (
              <div key={s.id} className={`queue-item${s.id === currentSongId ? " current" : ""}`} onClick={() => { setCurrentSong(songs.indexOf(s)); setShowQueue(false);}}>
                <img className="queue-thumb" src={s.album} alt={s.title} />
                <div className="queue-info">
                  <span className="queue-name">{s.title}</span>
                  <span className="queue-artist">{s.artist}</span>
                </div>
                {s.id === currentSongId && <div className="queue-dot"/>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}