import LandingPage from "./Pages/LandingPage/LandingPage.jsx"
import Login from "./Pages/Login/Login.jsx"
import Chat from "./Pages/Chatengine/Chat"
import Register from "./Pages/Register/Register.jsx"
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"
import MyProducts from "./Pages/MyProducts/MyProducts.jsx"
import TransactionDetails from "./Pages/TransactionDetails/TransactionDetails.jsx"
import ExploreProducts from "./Pages/ExploreProducts/ExploreProducts.jsx"
import WomanProducts from "./Pages/ExploreProducts/WomanProducts.jsx"
import ManProducts from "./Pages/ExploreProducts/ManProducts.jsx"
import Details from "./Pages/Details/Details.jsx"
import SuccessPage from "./Pages/SuccessPage/SuccessPage.jsx"
import TransactionHistory from "./Pages/TransactionHistory/TransactionHistory.jsx"
import UploadProduct from "./Pages/UploadProduct/UploadProduct.jsx"
import NoMatch from "./Pages/NoMatch/NoMatch.jsx"
import Navbar from "./Components/Navbar.jsx"
import LoadingPage from './Pages/LoadingPage/LoadingPage'
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom"
import { GuardProvider, GuardedRoute } from 'react-router-guards';

const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem('access_token')) {
      next();
    }
    next.redirect('/login');
  } else {
    next();
  }
};

function App() {
  return (
    <>
      <Router>
        <GuardProvider guards={[requireLogin]} loading={LoadingPage} error={NoMatch}>
          <Navbar Link={Link} />
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <GuardedRoute path="/chats" meta={{ auth: true }}>
              <Chat />
            </GuardedRoute>
            <GuardedRoute path="/dashboard" meta={{ auth: true }}>
              <Dashboard />
            </GuardedRoute>
            <GuardedRoute path="/products" meta={{ auth: true }}>
              <MyProducts />
            </GuardedRoute>
            <GuardedRoute path="/details-transaction/:id" meta={{ auth: true }}>
              <TransactionDetails />
            </GuardedRoute>
            <Route exact path="/browse">
              <ExploreProducts />
            </Route>
            <Route path="/browse/woman">
              <WomanProducts />
            </Route>
            <Route path="/browse/man">
              <ManProducts />
            </Route>
            <Route path="/details/:id">
              <Details />
            </Route>
            <GuardedRoute path="/success" meta={{ auth: true }}>
              <SuccessPage />
            </GuardedRoute>
            <GuardedRoute path="/history-transaction" meta={{ auth: true }}>
              <TransactionHistory />
            </GuardedRoute>
            <GuardedRoute path="/upload" meta={{ auth: true }}>
              <UploadProduct />
            </GuardedRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </GuardProvider>
      </Router>
    </>
  );
}

export default App;
