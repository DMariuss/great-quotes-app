import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/useHttp";
import { getAllComments } from "../../api-functions/request-functions";

const Comments = () => {
  const {
    sendRequest: fetchComments,
    data: loadedComments,
    error,
    status,
  } = useHttp(getAllComments);

  const [isAddingComment, setIsAddingComment] = useState(false);
  //folosesc useParams aici pt ca nu greau sa o refolosesc componenta
  const params = useParams();
  const { quoteId } = params;

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  //pt ca vreau sa preiau iar toate comentariile, dupa ce l-am postat pe ultimul 🢣 se activeaza din NewCommentForm
  const addedCommentHandler = useCallback(() => {
    fetchComments(quoteId);
  }, [quoteId, fetchComments]);

  useEffect(() => {
    fetchComments(quoteId);
  }, [fetchComments, quoteId]);

  let comments;

  if (status === "pending") {
    //aleg aceasta abordare pt ca nu vreau sa pierd celelalte elemente
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
