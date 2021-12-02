import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import Login from './login/Login'
import User from './user/User'
import Details from './details/Details'
import Gallery from './gallery/Gallery.jsx'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Gallery/>} />
        </Routes>

        <Routes>
          <Route path='/login' element={<Login/>} />
        </Routes>
        
        <Routes>
          <Route path='/user' element={<User/>} />
        </Routes>

        <Routes>
          <Route path='/details/:id' element={<Details/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
