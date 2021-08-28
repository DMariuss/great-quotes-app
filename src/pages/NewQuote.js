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

  // initial ⇨ status = pending; cand am un rezultat favorabil ⇨ status = completed
  useEffect(() => {
    if (status === "completed" && !error) {
      history.push("/quotes"); // trebuie pus in useEffect, altfel am eroare de randare (va redirectiona inainte de a se ajunga la randarea <QuoteForm> si a sfarsi ciclul)
    }
    // in cazul unei erori 🢣 to be continued
    if (status === "completed" && error) {
      console.log(error);
      //voi folosi un modal aici
    }
  }, [status, history, error]);

  return (
    <QuoteForm onAddQuote={addQuoteHandler} isLoading={status === "pending"} />
  );
};

export default AddQuote;
