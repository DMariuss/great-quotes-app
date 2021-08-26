import { useEffect } from "react";
import { useHistory } from "react-router-dom";
//          ⇧ permite sa modificam istoricul paginilor vizitate : permite sa implementam navigare programabila
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/useHttp";
import { addQuote } from "../api-functions/request-functions";

const AddQuote = (props) => {
  //folosesc hook-ul personalizat pt a trimite citatul catre server
  const { sendRequest: sendQuote, error, status } = useHttp(addQuote); //, false); ⇦ este implicit

  const history = useHistory();

  const addQuoteHandler = (quote) => {
    //aici preiau citatul introdus (datele de la formular)     🢣 le trimit catre server
    sendQuote(quote); // 🢣 { author: , text:  }

    //trimit solicitarea si cand este rezolvata (rezultat dat de 'status') navighez pe alta pagina 🢣 mut codul de mai jos in useEffect()
    // ⇧ ⇩   ⇧ ⇩   ⇧ ⇩    ⇧ ⇩    ⇧ ⇩
    // pt o buna interactiune cu utilizatorul, dupa trimiterea citatului catre server, este indicat sa redirectionez catre pagina cu toate citatele(sau home)
    // history.push("/quotes");
    //        .push() 🢣 trimite catre o noua pagina, util. se poate reintoarce la pagina precedenta
    //        .replace() 🢣 trimite catre o noua pagina, util. nu i se mai permite reintoarcerea la pagina precedenta(practic o elimina din istoric)
  };
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
    // in cazul unei erori 🢣 to be continued
  }, [status, history]);

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default AddQuote;
