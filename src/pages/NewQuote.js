import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
//          ⇧ permite sa modificam istoricul paginilor vizitate : permite sa implementam navigare programabila

const AddQuote = (props) => {
  const history = useHistory();

  const addQuoteHandler = (quote) => {
    //aici preiau citatul introdus (datele de la formular)     🢣 le trimit catre server
    console.log(quote);
    // pt o buna interactiune cu utilizatorul, dupa trimiterea citatului catre server, este indicat sa redirectionez catre pagina cu toate citatele(sau home)
    history.push("/quotes");
    //        .push() 🢣 trimite catre o noua pagina, util. se poate reintoarce la pagina precedenta
    //        .replace() 🢣 trimite catre o noua pagina, util. nu i se mai permite reintoarcerea la pagina precedenta(practic o elimina din istoric)
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default AddQuote;
