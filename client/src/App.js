import LandingPage from "./Pages/LandingPage/LandingPage.jsx"
import Login from "./Pages/Login/Login.jsx"
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"
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
        </Switch>
      </Router>
    </>
  );
}

export default App;
