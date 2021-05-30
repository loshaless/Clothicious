import LandingPage from "./Pages/LandingPage/LandingPage.jsx"
import Login from "./Pages/Login/Login.jsx"
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"
import MyProducts from "./Pages/MyProducts/MyProducts.jsx"
import TransactionDetails from "./Pages/TransactionDetails/TransactionDetails.jsx"
import ExploreProducts from "./Pages/ExploreProducts/ExploreProducts.jsx"
import WomanProducts from "./Pages/ExploreProducts/WomanProducts.jsx"
import ManProducts from "./Pages/ExploreProducts/ManProducts.jsx"
import Details from "./Pages/Details/Details.jsx"
import Navbar from "./Components/Navbar.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom"
function App() {
  return (
    <>
      <Router>
        <Navbar Link={Link} />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/products">
            <MyProducts />
          </Route>
          <Route path="/details-transaction/:id">
            <TransactionDetails />
          </Route>
          <Route exact path="/browse">
            <ExploreProducts />
          </Route>
          <Route path="/browse/woman">
            <WomanProducts />
          </Route>
          <Route path="/browse/man">
            <ManProducts />
          </Route>
          <Route path="/browse/details/:id">
            <Details />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
