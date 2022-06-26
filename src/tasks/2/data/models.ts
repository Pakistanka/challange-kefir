export interface IComments {
    comments: IComment[];
    authors: IAuthor[];
  }

  export interface ICommentProps {
    comment: IComment;
    authors: IAuthor[] | undefined;
    answers?: IComment[] | undefined;
  }

  export interface IComment {
    id: number;
    created: Date;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
    avatar: string;
  }

  export interface IAuthor {
    id: number;
    name: string;
    avatar: string;
  }
