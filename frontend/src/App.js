import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import Login from './login/Login'
import User from './user/User'

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Login/>} />
        </Routes>
        
        <Routes>
          <Route path='/user' element={<User/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
