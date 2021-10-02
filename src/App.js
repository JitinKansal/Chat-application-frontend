import './App.css';
import Landingpage from './components/Landingpage/Landingpage';
// import Interface from './components/Interface/Interface';
import Signin from './components/Signin/signin';
import Signup from './components/Signup/signup';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import {GlobalState} from './components/context';


function App() {
  return (
    <GlobalState>
      <BrowserRouter>
      <div className="App">
      <Switch>
            <Route exact path="/" component={Landingpage}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
      </Switch>
      </div>
      </BrowserRouter>
      </GlobalState>
  );
}

export default App;
