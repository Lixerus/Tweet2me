import {Route, Routes} from "react-router-dom"
import './App.css';
import GlobalPage from './components/GlobalPage';
import DetailViewPage from "./components/DetailViewPage";
import Navbar from "./components/UI/Navbar";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";

function App() {

  return (

    <Routes>
      <Route path ='/'  element={<Navbar />} >
        <Route index element={<GlobalPage />} />
        <Route path='/tweet/:id' element={<DetailViewPage />} />
      </Route>
      <Route path='/register' element={<RegistrationPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/logout' element={<LogoutPage />}/>
    </Routes>
  );
}

export default App;
