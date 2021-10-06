import { Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
// import Footer from './components/Footer';
import { index } from './pages'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path="/login"                  component={index.SignUPLoginPage} />
        <Route exact path="/signup"                 component={index.SignUPLoginPage} />
        <Route exact path="/profile"                component={index.ProfilePage} />
        <Route exact path="/search"                 component={index.SearchPage} />
        <Route exact path="/checkout"               component={index.CheckoutPage} />
        <Route exact path="/card/:id"               component={index.CardDetailPage} />
        <Route exact path="/order/:id"              component={index.OrderPage} />
        <Route exact path="/"                       component={index.FrontPage} />
      </Switch>
    </div>
  );
}

export default App;
