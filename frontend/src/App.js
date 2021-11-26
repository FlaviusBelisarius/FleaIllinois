import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';
import Login from './login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Login/>} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
