import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/useHttp";
import { useEffect } from "react";
import { getAllQuotes } from "../api-functions/request-functions";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

export const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Julia Child",
    text: "Viata insasi este un chef ca lumea.",
  },
  {
    id: "q2",
    author: "Bertrand Russell",
    text: "A trai fara cateva dintre lucrurile pe care le vrei e o parte indispensabila a fericirii",
  },
  {
    id: "q3",
    author: "Confucius",
    text: "Exista cinci virtuti pe care le poti avea oricand: seriozitatea, generozitatea sufletului, sinceritatea , deschiderea si bunatate",
  },
  {
    id: "q4",
    author: "George Herbert",
    text: "Furtunile fac radacinile stejarilor sa creasca.",
  },
];

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
