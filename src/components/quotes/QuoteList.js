import { Fragment } from "react";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
//import useHistory, useLocation pt a folosi parametrii query 🢣 pt a retine sortarea(pt cand trimit link-ul altcuiva)
import { useHistory, useLocation } from "react-router-dom";
// useHistory 🢣 setez parametrii query; useLocation 🢣 preiau informatiile despre pagina incarcata/curenta --aici, stringul query

//functie pt sortarea listei
const sortQuotes = (quotes, ascending) => {
  //o mic modificare pt a lucra cu date imuabile
  const sortedQuotes = [...quotes];
  return sortedQuotes.sort((quoteA, quoteB) => {
    if (ascending) {
      // ascending will be true/false
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search); // 🢢 constructor pus la dispozitie de catre browser pt a prelua datele dintr-un string query 🢣 mult mai convenabil, puteam face asta manual
  //                            ⇧ intoarce un Obiect de tip URLSearchParams cu anumite metode

  const changeSortingHandler = () => {
    // *** varianta mai abordabila pt history.push() 🢣
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "descending" : "ascending"}`,
    });

    //history.push pt a trimite pe aceasta adresa(aici pt a seta parametrii query) si disponibilitatea de a ma reintoarce la pagina precedenta
    // history.push(
    //   `${location.pathname}?sort=${
    //     // 🢣 location.pathname 🢢 pt a adauga dinamic ruta
    //     isSortingAscending ? "descending" : "ascending"
    //   }`
    // ); // orice utilizare a metodelor de pe acest obiect al hook-ului a duce la reevaluarea componentei
    // ⇧ logica este buna, cumva am o intarziere
  };

  const isSortingAscending = queryParams.get("sort") === "ascending"; // variabila ce va modifica comportamentul

  const sorted = sortQuotes(props.quotes, isSortingAscending);
  // varianta pt sortare
  // const sorted = props.quotes.sort((a, b) => {
  //   return isSortingAscending ? a.id[1] - b.id[1] : b.id[1] - a.id[1];
  // })

  let delay;
  const content = sorted.map((quote, index) => {
    delay = index * 10;
    return (
      <QuoteItem
        key={quote.id} // ⇧ mutat mai sus pe componenta de tranzitie
        id={quote.id}
        author={quote.author}
        text={quote.text}
        isSortingAscending={isSortingAscending}
        delay={delay}
      />
    );
  });

  return (
    <Fragment>
      {/* Adaug buton pt sortare 🢣 click pt sortarea specificata */}
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>{content}</ul>
    </Fragment>
  );
};

export default QuoteList;
