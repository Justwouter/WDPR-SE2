import './App.css';
import ShowForm from './AddShow';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';


const App = (props) => {
  return (
    
      <div className="main-content">
      <BrowserRouter>
        <Routes>
          <Route element={<ShowForm/>} path="/WDPR-SE2/ShowForm" />
        </Routes>
        </BrowserRouter>
      </div>
   
  );
}

export default App;
