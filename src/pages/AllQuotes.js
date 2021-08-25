import QuoteList from "../components/quotes/QuoteList";

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
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
