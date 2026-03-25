import type { PlayerState } from "./usePlayerState";

/*=========================SWIPE LEFT/RIGHT ON ALBUM COVER TO CHANGE SONG=========================*/
export function useSwipe(
  state: PlayerState,
  handleNext: () => void,
  handlePrev: () => void,
) {
  const { startXRef, dragging } = state;

  /*=========================MOUSE SUPPORT=========================*/
  function onMouseDown(e: React.MouseEvent): void {
    dragging.current = true;
    startXRef.current = e.clientX;
  }

  function onMouseUp(e: React.MouseEvent): void {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = (startXRef.current ?? e.clientX) - e.clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  }

  /*=========================TOUCH SUPPORT=========================*/
  function onTouchStart(e: React.TouchEvent): void {
    startXRef.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent): void {
    const diff = (startXRef.current ?? 0) - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff< -50) handlePrev();
  }

  return { onMouseDown, onMouseUp, onTouchStart, onTouchEnd };
}