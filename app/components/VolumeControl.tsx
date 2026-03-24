import "../styles/volumeControl.css";
// volume control component
type VolumeControlProps = {
  volume: number;
  setVolume: (val: number) => void;
};

export default function VolumeControl({ volume, setVolume } : VolumeControlProps) {
  return (
    <div className="volume-control">
      <span className="volume-btn"><i className="fa-solid fa-volume-low"></i></span>
      <input
        title="volume control"
        type="range" 
        min="0" 
        max="100" 
        value={volume} 
        className="volume-slider" 
        onChange={(e) => setVolume(parseInt(e.target.value))} 
      />
      <span className="volume-btn"><i className="fa-solid fa-volume-high"></i></span>
    </div>
  );
}