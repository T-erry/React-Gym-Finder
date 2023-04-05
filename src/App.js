import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from "react"
import './App.css';
import Signup from './components/Pages/Signup/Signup';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login';
import DashBoard from './components/DashBoard/DashBoard';
import ViewGym from './components/ViewGym/ViewGym';
import CreateGym from './components/CreateGym/CreateGym';
import UpdateGym from './components/UpdateGym/UpdateGym';


function App() {
  const [gyms, setGyms] = useState([])
  


  useEffect(() => {
      fetch("/gyms")
      .then((res)=> res.json())
      .then((data)=> setGyms(data))
  },[])
  
  function handleAddGym(newGym) {
    setGyms([...gyms, newGym]);
  }
  return (
    <div className='container'>
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/signup" element={< Signup/>} />
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={< Login/>} />
    <Route path="/dashboard" element={< DashBoard gyms={gyms}/>} />
    <Route path="/view/:id"  element={<ViewGym />} />

     <Route path="/creategym" element={<CreateGym onAddGym={handleAddGym}/>} />
    <Route path="/updategym/:id"  element={<UpdateGym />} /> 
      </Routes>
    </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
