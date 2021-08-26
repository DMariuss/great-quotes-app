import {
  useParams,
  Route,
  Link,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { DUMMY_QUOTES } from "./AllQuotes";

const QuoteDetails = (props) => {
  // *** varianta pt a ascunde link-ul 'See comments'
  // const location = useLocation();

  //pt a prelua calea url-ului 🢣 cand avem multe link-uri imbricate si vrem sa modificam rutarea principala 🢣 folosim rutele dinamice
  const match = useRouteMatch(); // 🢣 un fel de useLocation cu mai multe date
  // console.log(match);

  const params = useParams(); // 🢣 preiau parametrul din link, pus pe :quoteId

  // *** varianta pt a ascunde link-ul 🢣 nu trebuie sa folosesc starea pt asta, din cauza ca la modificarea url-ului se reevalueaza componenta
  // const hideBtn = location.pathname === `/quotes/${params.quoteId}/comments`;

  //caut citatul selectat in lista cu citate
  const selectedQuote = DUMMY_QUOTES.find(
    (quote) => quote.id === params.quoteId
  );

  // validare, in cazul in care nu se gaseste id-ul respectiv (daca introduc alt id/adresa in URL) *********
  if (!selectedQuote) {
    return <p className="no-quote-found">No quote found...</p>;
  }
  const { author, text } = selectedQuote;

  console.log("randare QuoteDetails");

  return (
    <div>
      <HighlightedQuote author={author} text={text} />
      {/* {!hideBtn && (
        <div className="centered">
          <Link to={`/quotes/${params.quoteId}/comments`} className="btn--flat">
            See comments
          </Link>
        </div>
      )} */}
      {/* **** varianta si mai simpla folosind Rutarea exacta*/}
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            See comments
          </Link>
        </div>
      </Route>
      {/* <Route path="/quotes/:quoteId/comments"> ⇩ sau pot introduce dinamic * de preferat */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default QuoteDetails;
