import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/useHttp";
import { useEffect } from "react";
import { getAllQuotes } from "../api-functions/request-functions";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
  const {
    sendRequest: fetchQuotes,
    data: loadedQuotes,
    error,
    status,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    //trimit solicitarea catre server pt a prelua citatele
    fetchQuotes();
  }, [fetchQuotes]);

  //componenta ce se afiseaza pt loading
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  //daca am eroare o voi afisa
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  //in cazul in care nu gasesc citatele sau primesc un vector gol
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  //in ultima instanta primesc datele
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
