import { useRef, useEffect } from "react";
import classes from "./NewCommentForm.module.css";
import { addComment } from "../../api-functions/request-functions";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const {
    sendRequest: sendQuote,
    // data: commentId,
    status,
    error,
  } = useHttp(addComment);
  const commentTextRef = useRef();

  const { quoteId, onAddedComment } = props;

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    // validarea se poate face aici

    // pt a prelua id-ul pot folosi useParams, dar aceasta componenta nu ar mai putea fi globala(reutilizabila); o vreau mai flexibila 🢣 props
    sendQuote({ data: { text: enteredText }, quoteId }); // din nu stiu ce cauza nu-mi lua separat argumentele ca: ({text: enteredText}, quoteId) ..
  };

  //vreau ca atunci cand solicitarea este completa sa-mi anunte/apeleze o functie din comp. parinte Comments pt a prelua toate comentariile.
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
