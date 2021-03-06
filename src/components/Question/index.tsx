import { ReactNode } from "react";
import classnames from "classnames";

import { useTheme } from '../../hooks/useTheme'
import "./style.scss";

type QuestionsType = {
  children?: ReactNode;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted?: boolean;
  isAnswered?: boolean;
};

export function Question({
  children,
  content,
  author,
  isHighlighted = false,
  isAnswered = false,
}: QuestionsType) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={classnames(
        `question ${theme}`,
        { highlighted: isHighlighted && !isAnswered},
        { answered: isAnswered }
        
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
