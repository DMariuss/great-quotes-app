import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { CSSTransition } from "react-transition-group";

//creez fundalul ce poate fi clickable
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

//creez corpul modalului
const ModalOverlay = (props) => {
  return (
    //   ar mai fi fost o varianta sa infasor tot ce am aici cu Transition ... 🢣 aplic aceasta varianta
    <CSSTransition
      in={props.hasError} // 🢢 valoare booleana pt a aplica sau nu aceste proprietati
      timeout={300} // 🢢 temporizator (ex: duratia de la entering -> entered, exiting -> exited)
      mountOnEnter // 🢢 monteaza componenta
      unmountOnExit // 🢢 demonteaza componenta
      classNames={{
        enterActive: classes["modal-open"],
        exitActive: classes["modal-close"],
      }}
    >
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </CSSTransition>
  );
};

//creez modalul complet ce va muta elementele in locul selectat
const Modal = (props) => {
  const loginModal = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(
        props.hasError && <Backdrop onClick={props.onClick} />,
        loginModal
      )}
      {ReactDOM.createPortal(
        <ModalOverlay hasError={props.hasError}>{props.children}</ModalOverlay>,
        loginModal
      )}
    </>
  );
};

export default Modal;
