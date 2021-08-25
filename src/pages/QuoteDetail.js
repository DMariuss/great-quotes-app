import { useParams, Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { DUMMY_QUOTES } from "./AllQuotes";

const QuoteDetails = (props) => {
  const params = useParams();

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
      {/* <Route path="/quotes/:quoteId/comments"> ⇩ sau pot introduce dinamic * de preferat */}
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default QuoteDetails;
