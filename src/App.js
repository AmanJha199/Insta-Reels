import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup'
import AuthProvider from './Context/AuthProvider'
import POC1 from './Material-UI/POC1'
import Trail from './Components/Trail'
import Signin from './Components/Signin';
import Ioa from './Components/Ioa'
import Video from './Components/Video'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Feed from './Components/Feed'
import PrivateRoute from './Components/PrivateRoute'


function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Feed} />
          <Route path='/login' component={Signin} />
          <Route path='/sign-up' component={Signup} />
        </Switch>
      </AuthProvider>
    </Router>


  );
}

export default App;
