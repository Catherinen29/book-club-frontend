import './App.css';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home'
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Login from './components/LogIn';
import BookPage from './components/BookPage';

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  function isLoggedIn(){
      const getToken = localStorage.getItem("token")
      // console.log(getToken)
      // If there is a token held in local storage, 
      // setIsUserLoggedIn to true.
      if (getToken){
          setIsUserLoggedIn(true)
      }
  }

  return (
    <div>

      <div className='NavBar'>
           <NavBar isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
           />  </div>

      <Routes>
        <Route path="/Home" element={<Home
                    isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<Login  
                    isUserLoggedIn={isUserLoggedIn}
                    setIsUserLoggedIn={setIsUserLoggedIn}/>} />
        <Route path="/books/:id" element={<BookPage 
                    isUserLoggedIn={isUserLoggedIn} />} />
      </Routes>

    </div>
  );
}

export default App;
