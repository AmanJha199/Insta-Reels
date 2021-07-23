import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup'
import AuthProvider from './Context/AuthProvider'
import POC1 from './Material-UI/POC1'
import Trail from './Components/Trail'
import Signin from './Components/Signin';

function App() {
  return (
    <AuthProvider>
    <Signin></Signin>
    </AuthProvider>
    // <POC1></POC1>
    // <Trail></Trail>
    // <Signup></Signup>
    // <Signin></Signin>
  );
}

export default App;
