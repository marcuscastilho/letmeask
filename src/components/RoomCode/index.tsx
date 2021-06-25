import copyImg from "../../assets/images/copy.svg";
import "./style.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCode() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCode}>
      <div>
        <img src={copyImg} alt="Copy room" />
      </div>
      <span> Sala #{props.code}</span>
    </button>
  );
}
