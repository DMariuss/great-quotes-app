import classes from "./ErrorModal.module.css";
import Modal from "../UI/Modal";
import { useState, useEffect } from "react";

// pe click trebuie sa trimit o stare ce se schimba la eroare...pt ca eroarea nu o pot modifica pe click.
const ErrorModal = (props) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // error = null 🢣 false; error = 'eroarea text' 🢣 true
    if (typeof props.error === "string") {
      setHasError(true);
    }
  }, [props.error]);

  const onClickHandler = () => {
    setHasError(false);
  };

  return (
    <Modal onClick={onClickHandler} hasError={hasError}>
      <div className={classes["modal-header"]}>
        <h2>Error</h2>
        <p>{props.error}</p>
      </div>
      <div className={classes.action}>
        <button
          className={`btn ${classes["modal-btn"]}`}
          onClick={onClickHandler}
        >
          ok
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
