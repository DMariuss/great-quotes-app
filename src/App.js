import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
// 🢣 sa ma interesez cum pot importa conditionat pt o mai buna optimizare
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        {/*⇧ o singura ruta activa la un moment dat */}
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        {/* in cazul in care introduc o adresa necunoscuta */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
