import React from 'react'
import likeUrl from "./../../../assets/like.svg";
import { ICommentProps } from '../data/models';


const Comment: React.FC<ICommentProps> = ({comment, authors, answers}) => {

    const getAuthor = (authorId: number) =>
      authors?.find((author: { id: number; }) =>
      author.id === authorId);

    const authorName = getAuthor(comment.author)?.name;
    const avatarURI = getAuthor(comment.author)?.avatar;

    return (
      <div className="block">
        <img src={avatarURI} alt="" className="img" width="60" height="60" />
        <div className="about">
          <div className="about-author">
            <div className="name">{authorName}: </div>
            <time className="time">
                {new Date(comment.created).toLocaleTimeString(
                    [], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'} )
                }
            </time>
          </div>
          <div className="likes">
              <img src={likeUrl} alt="" />
              <span className="like">{comment.likes}</span>
          </div>
        </div>
        <div className="text">"{comment.text}"</div>

        {answers && answers.length > 0 && (
          <div className="comment">
            {answers?.map((answer) =>
              <Comment
                key={answer.id}
                comment={answer}
                authors={authors} /> )}
          </div>
        )}
      </div>
    )
}


export default Comment;
