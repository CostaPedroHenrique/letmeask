import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
// import { AuthContext } from '../contexts/AuthContext';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';

import deleteImg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';
import answerImg from '../assets/images/answer.svg';
import checkImg from '../assets/images/check.svg';



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

  async function handleCheckQuestionAnswered(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img onClick={() => history.push('/')} src={logoImg} alt="Letmeask" />
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
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={checkImg} alt="Dar destaque à pergunta" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAnswered(question.id)}
                    >
                      <img src={answerImg} alt="Marcar pergunta como respondida" />
                    </button>
                  </>
                )}
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