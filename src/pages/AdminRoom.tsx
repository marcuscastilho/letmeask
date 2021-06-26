import { useHistory, useParams } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import { Header } from "../components/Header";
import { Question } from "../components/Question";

import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import "../styles/room.scss";

type RooomParamsType = {
  id: string;
};

export function AdminRoom() {
  const { theme, toggleTheme } = useTheme();
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
    <div id="page-room" className={theme}>
      <Header handleEndRoom={handleEndRoom} roomId={roomId} isAdmin/>

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
