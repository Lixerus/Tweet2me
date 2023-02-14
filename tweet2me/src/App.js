import {Route, Routes} from "react-router-dom"
import './App.css';
import GlobalPage from './components/GlobalPage';

function App() {

  return (

    <Routes>
      <Route path="/" element={
        <GlobalPage />
      } />
      <Route path='/tweet/:id' element={<h1>edit</h1>} />

    </Routes>
  );
}

export default App;
