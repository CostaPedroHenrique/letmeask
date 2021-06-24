import { useHistory, useParams } from 'react-router-dom';
import deleteImg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
// import { AuthContext } from '../contexts/AuthContext';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';




interface RoomParams {
  id: string;
}

export function AdminRoom() {

  const history = useHistory();

  // const { user } = AuthContext();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const {questions, title} = useRoom(roomId);

  async function handleEndRoom(){
    if(window.confirm('Tem certeza que deseja encerrar esta sala?')){
      await database.ref(`rooms/${roomId}`).update({
        endetAt: new Date(),
      })
    }
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                content={question.content}
                author={question.author}
                key={question.id}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar Pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  )
};