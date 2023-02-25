import {Route, Routes} from "react-router-dom"
import { createContext, useState, useEffect } from "react";
import './App.css';
import fetchdata from "./fetch_data/globaltweet";
import GlobalPage from './components/GlobalPage';
import DetailViewPage from "./components/DetailViewPage";
import Navbar from "./components/UI/Navbar";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import FeedPage from "./components/FeedPage";
import ProfilePage from "./components/ProfilePage";

export const CsrfTokenContext = createContext(null);

function App() {

  let [csrfToken, setCsrfToken] = useState(null)

  const getCSRF = (e) => {
    fetchdata("GET","http://localhost:8000/api/tweets/csrftoken/")
    .then((xhr) => {
      const csrfToken = xhr.getResponseHeader('X-CSRFToken')
      setCsrfToken(csrfToken)
    })
    .catch(err => alert(err))
  }

  useEffect(()=> {
    getCSRF()
  }, [])

  return (

    <CsrfTokenContext.Provider value = {csrfToken}>
    <Routes>
      <Route path ='/'  element={<Navbar />} >
        <Route index element={<GlobalPage />} />
        <Route path='/feed' element={<FeedPage />}/>
        <Route path='/tweet/:id' element={<DetailViewPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      <Route path='/register' element={<RegistrationPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/logout' element={<LogoutPage />}/>
    </Routes>
    </CsrfTokenContext.Provider>
  );
}

export default App;
