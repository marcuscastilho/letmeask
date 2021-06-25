import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { database } from "../services/firebase";

type FirebaseQuestionsType = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  hasLiked: boolean;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTItle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestionsType =
        databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id),
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
          };
        }
      );

      setQuestions(parsedQuestions);
      setTItle(databaseRoom.title);
    });

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id]);

  return { questions, title };
}
