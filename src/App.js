import { Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import { index } from './pages'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path="/login"      component={index.SignUPLoginPage} />
        <Route exact path="/signup"     component={index.SignUPLoginPage} />
        <Route exact path="/profile"    component={index.ProfilePage} />
        <Route exact path="/"           component={index.FrontPage} />
      </Switch>
    </div>
  );
}

export default App;
