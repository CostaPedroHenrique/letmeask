import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import logoWhiteImg from '../assets/images/logo-white.svg';
import googleIcon from '../assets/images/google-icon.svg';

import { AuthContext } from '../contexts/AuthContext';

import { Button } from '../components/Button';
import { database } from '../services/firebase';

import '../styles/auth.scss'
import { useTheme } from '../contexts/ThemeContext';

export function Home(){
  const { theme, toogleTheme } = useTheme();

  const [roomCode, setRoomCode] = useState('');
  const { user, signInWithGoogle } = AuthContext();
  const history = useHistory();

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle();
    }
    history.push('/rooms/new');

  }
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim()===''){
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room does not exists.');
      return;
    }

    if(roomRef.val().endedAt){
      alert('Room already closed.');
      return;
    }

    if(roomRef.val().authorId===user?.id){
      history.push(`/admin/rooms/${roomCode}`)
    }else{
      history.push(`rooms/${roomCode}`)
    }

  }

  return (
    <div id='page-auth' className={theme}>
      <aside>
        <img src={ilustrationImg} alt="Ilustração perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <div className="switch-theme">
        <label id="switch" className="switch">
            <input type="checkbox" onChange={(e) => toogleTheme(e.target.checked)} id="slider"/>
            <span className="slider round"/>
        </label>
      </div>
      <main>
        <div className="main-content">
          <img src={theme ==="light" ? logoImg : logoWhiteImg} alt="Logo" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="Icon do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={e => setRoomCode(e.target.value)}
              value={roomCode}
            />

            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}