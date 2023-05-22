import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/Notestate';
import Login from './components/Login';
import SignUp from './components/SignUp';





function App() {
  return (
   <div>
    
     <NoteState>
     <Router>
      <Navbar/>
      <div className="container">
         <Routes>
           <Route  exact path='/' element={< Home/>}></Route>
           <Route exact path='/About' element={<About />}></Route>
           <Route exact path='/login' element={<Login />}></Route>
           <Route exact path='/signup' element={<SignUp />}></Route>

         </Routes>
         </div>

       </Router>
 
     </NoteState>
    
 
   
   </div>
  );
}

export default App;
