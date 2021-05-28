import LandingPage from "./Pages/LandingPage/LandingPage.jsx"
import Login from "./Pages/Login/Login.jsx"
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
        </Switch>
      </Router>
    </>
  );
}

export default App;
