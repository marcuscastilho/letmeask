import { useHistory, useParams } from "react-router-dom";

import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import { Button } from "../components/Button";
import { Question } from "../components/Question";

import { RoomCode } from "../components/RoomCode";

import deleteImg from "../assets/images/delete.svg";
import logoImg from "../assets/images/logo.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import "../styles/room.scss";

type RooomParamsType = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RooomParamsType>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });

    history.push(`/`);
  }

  async function handleCheckQuestionAnswered(
    questionId: string
  ) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }
  async function handleHighLightQuestion(
    questionId: string,
    isHighlighted: boolean
  ) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: !isHighlighted,
    });
  }
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
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
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleCheckQuestionAnswered(
                          question.id
                        )
                      }
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleHighLightQuestion(
                          question.id,
                          question.isHighlighted
                        )
                      }
                    >
                      <img src={answerImg} alt="Destacar pergunta" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
