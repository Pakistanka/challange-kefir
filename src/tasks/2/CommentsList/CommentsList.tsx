
import React, {useState, useEffect} from "react";
import getDataRequest from "../data/getDataRequest";
import "./comments.css"
import Comment from './Comment'
import { IComment, IComments } from "../data/models";



const CommentsList = () => {

    let data: IComments | null;

    const [comments, setComments] = useState<any[]>([])
    const [authors, setAuthors] = useState<any[]>([])



    getDataRequest().then(function(value) {
      data = value;
      setComments(data?.comments)
      setAuthors(data?.authors)
    })


    const posts = comments
    // getting comments without parents
    .filter((comment) => !comment.parent)
    // arranging them by date
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    const getAnswers = (commentId: number, answers: IComment[] = []) => {
        const answer = comments.find(({parent}) => parent === commentId);
        if (!answer) {
            return answers;
        } else {
            answers.push(answer);
            getAnswers(answer.id, answers);
        }
        return answers;
    };



    return (
        <div className="wrap">
            <div className="heading">Comments List</div>

            {posts?.map((post) => (
              <Comment
                key={post.id}
                comment={post}
                authors={authors}
                answers={getAnswers(post.id)}
              />

            ))}
        </div>

    );
};

export default CommentsList;


