import {Route, Routes} from "react-router-dom"
import './App.css';
import GlobalPage from './components/GlobalPage';
import DetailViewPage from "./components/DetailViewPage";
import Navbar from "./components/UI/Navbar";
import RegistrationForm from "./components/RegistrationForm";

function App() {

  return (

    <Routes>
      <Route path ='/'  element={<Navbar />} >
        <Route index element={<GlobalPage />} />
        <Route path='/tweet/:id' element={<DetailViewPage />} />
      </Route>
      <Route path='/register' element={<RegistrationForm />}/>
    </Routes>
  );
}

export default App;
