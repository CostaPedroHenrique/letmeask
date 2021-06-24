import { ReactNode } from 'react';
import './question.scss';

interface QuestioProps  {
  content: string;
  author: {
    name: string;
    avatar: string;
  },
  children?: ReactNode
}
export function Question({ content, author, children }: QuestioProps){
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}