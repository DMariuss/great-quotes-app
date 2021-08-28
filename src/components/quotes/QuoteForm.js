import { useRef, useState } from "react";
import { Prompt } from "react-router-dom"; // 🢣 pt prevenirea tranzitiilor nedorite
//        ⇧ componenta ce asculta daca navigam pe alta pagina si daca o anumita conditie este indeplinita ne va arata un avertisment, inainte de a continua
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  //stare pt a verifica daca este sau nu concentrat formularul
  const [isEntering, setIsEntering] = useState(false);
  //stare pt validari
  const [formValidity, setFormValidity] = useState({
    author: true,
    text: true,
  });

  const { author, text } = formValidity;

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    //ar putea fi pusa o functie pt manpularea datelor pt a furniza textul corect ortografic(fara multe spatii intre caractere)...

    const enteredAuthor = authorInputRef.current.value
      .trim()
      .replace(/\s+/g, " "); // cod regex pt a inlocui multiplele spatii goale cu unul singur 🢣 alternativa: .split(' ') 🢣 .filter( el => el) 🢣 .join(' ');
    const enteredText = textInputRef.current.value.trim().replace(/\s+/g, " ");

    // validare aici 🢣 folosesc regex
    const authorIsValid = /^[a-zA-Z\s]+$/.test(enteredAuthor);
    const textIsValid = /^[a-zA-Z0-9\s;''""()?.!]+[.!?][.]*$/.test(enteredText); // un inceput de validare 🢣 trebuie regandita

    let formIsValid = authorIsValid && textIsValid;

    setFormValidity({ author: authorIsValid, text: textIsValid });

    if (!formIsValid) {
      return;
    }

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

  const authorClasses = `${classes.control} ${author ? "" : "invalid"}`; // .invalid 🢣 in index.css
  const textClasses = `${classes.control} ${text ? "" : "invalid"}`;

  return (
    <>
      <Card>
        <Prompt
          when={isEntering} // 🢣 true/false 🢣 daca prompterul va fi afisat sau nu cand util. vrea sa paraseasca pagina
          message={(location) => {
            // location 🢣 contine info despre pagina catre care vrem sa navigam
            console.log(location);
            return "Are you sure you want to leave the page without saving data?";
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

          <div className={authorClasses}>
            <label htmlFor="author">Author</label>
            <input name="author" type="text" id="author" ref={authorInputRef} />
            {!author && <p>Name must contain only letters</p>}
          </div>
          <div className={textClasses}>
            <label htmlFor="text">Text</label>
            <textarea
              name="textarea"
              id="text"
              rows="5"
              ref={textInputRef}
            ></textarea>
            {!text && <p>Please enter valid text. Must use ending marks! </p>}
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
