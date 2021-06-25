import copyImg from '../../assets/images/copy.svg';
import './room-code.scss';

interface RoomCodeProps {
  code: string;
}
export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button
      type="button"
      onClick={copyRoomCodeToClipboard}
      className="room-code"
    >
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
