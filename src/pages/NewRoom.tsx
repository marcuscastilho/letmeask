import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import { Button } from "../components/Button";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import logoWhiteImg from "../assets/images/logoWhite.svg";

import "../styles/auth.scss";

export function NewRoom() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  async function handleSignOutRoom(){
    signOut()
    history.push(`/`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustrationImg} alt="Ilustração da Home Page" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={theme === 'dark' ? logoWhiteImg : logoImg } alt="Letmeask" />

          {user && (
            <button className="logout-room" onClick={handleSignOutRoom}>
              Sair da conta Google
            </button>
          )}

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/"> clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
