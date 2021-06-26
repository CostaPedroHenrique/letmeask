import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoWhiteImg from '../assets/images/logo-white.svg';

import userImg from '../assets/images/user-icon.svg';

import { Button } from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

import { database } from '../services/firebase';

import '../styles/auth.scss';

export function NewRoom() {
  const { theme } = useTheme();

  const { user, signOut } = AuthContext();

  const history = useHistory();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={ilustrationImg} alt="Ilustração perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={theme === 'light' ? logoImg : logoWhiteImg} alt="Logo" />

          <div className="user-perfil">
            <img src={user?.avatar} alt="" />
            <div className="user-info">
              <h1>{user?.name}</h1>
              <h1>{user?.email}</h1>
            </div>
          </div>

          <div onClick={signOut} className="user-perfil">
            <img src={userImg} alt="" />
            <div className="user-info">
              <h1>Usar outra conta</h1>
            </div>
          </div>

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
            />

            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
