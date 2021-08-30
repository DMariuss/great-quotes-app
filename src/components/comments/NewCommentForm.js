import { useRef, useEffect, useState } from "react";
import classes from "./NewCommentForm.module.css";
import { addComment } from "../../api-functions/request-functions";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorModal from "../error-modal/ErrorModal";

const NewCommentForm = (props) => {
  const {
    sendRequest: sendQuote,
    // data: commentId,
    status,
    error,
  } = useHttp(addComment);
  const [commentIsValid, setCommentIsValid] = useState(true); // 🢣 initial -- nu vreau sa imi apara eroare.

  const commentTextRef = useRef();

  const { quoteId, onAddedComment } = props;

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value
      .trim()
      .replace(/\s+/g, " "); // inlocuiesc multiplele spatii goale

    //regex validity
    const textIsValid = /^[a-zA-Z0-9\s;''""()?.!]+$/.test(enteredText);

    setCommentIsValid(textIsValid);
    if (!textIsValid) {
      return;
    }

    // pt a prelua id-ul pot folosi useParams, dar aceasta componenta nu ar mai putea fi globala(reutilizabila); o vreau mai flexibila 🢣 props
    sendQuote({ data: { text: enteredText }, quoteId }); // din nu stiu ce cauza nu-mi lua separat argumentele ca: ({text: enteredText}, quoteId) ..
  };

  //vreau ca atunci cand solicitarea este completa sa-mi anunte/apeleze o functie din comp. parinte Comments pt a prelua toate comentariile.
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
    if (status === "completed" && error) {
      //modal here
    }
  }, [status, error, onAddedComment]);

  const textClasses = `${classes.control} ${
    commentIsValid ? "" : "invalid" // 🢣 in index.css
  }`;

  return (
    <>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {status === "pending" && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        <div className={textClasses} onSubmit={submitFormHandler}>
          <label htmlFor="comment">Your Comment</label>
          <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
          {!commentIsValid && (
            <p className={classes.centered}>Please enter valid text!</p>
          )}
        </div>
        <div className={classes.actions}>
          <button className="btn">Add Comment</button>
        </div>
      </form>
      <ErrorModal error={error} />
    </>
  );
};

export default NewCommentForm;
