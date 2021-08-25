import { useRef, useState } from "react";
import { Prompt } from "react-router-dom"; // 🢣 pt prevenirea tranzitiilor nedorite
//        ⇧ componenta ce asculta daca navigam pe alta pagina si daca o anumita conditie este indeplinita ne va arata un avertisment, inainte de a continua
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  //stare pt a verifica daca este sau nu concentrat formularul
  const [isEntering, setIsEntering] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });

    // setIsEntering(false); // se actualizeaza prea tarziu pt Prompt 🢣 o mut pe click-ul butonului (se va modifica inainte de a trimite redirectionarea)
  }

  //protectie pt navigarea nedorita 🢣 completez formularul si din greseala navighez pe alta pagina, sau back
  const formFocusHandler = () => {
    setIsEntering(true); // acum stiu ca utilizatorul lucreaza cu formularul, stare ce va fi trimisa catre Promp (si cand util va parasi pagina si este 'true'
    //                                    Prompt va avertiza
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  return (
    <>
      <Card>
        <Prompt
          when={isEntering} // 🢣 true/false 🢣 daca prompterul va fi afisat sau nu cand util. vrea sa paraseasca pagina
          message={(location) => {
            // location 🢣 contine info despre pagina catre care vrem sa navigam
            console.log(location);
            return "You tried to leave the page without saving data";
          }}
        />
        <form
          className={classes.form}
          onSubmit={submitFormHandler}
          //pe activare
          onFocus={formFocusHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={finishEnteringHandler}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
