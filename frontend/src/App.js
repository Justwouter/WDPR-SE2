import './App.css';
import ShowForm from './ShowsForm';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';


const App = (props) => {
  return (
    
      <div className="main-content">
      <BrowserRouter>
        <Routes>
          <Route element={<ShowForm/>} path="/WDPR-SE2/ShowsForm" />
        </Routes>
        </BrowserRouter>
      </div>
   
  );
}

export default App;
