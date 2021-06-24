import copyImg from '../../assets/images/copy.svg';
import './room-code.scss';

interface RoomCodeProps {
  code: string;
};
export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button onClick={copyRoomCodeToClipboard} className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}