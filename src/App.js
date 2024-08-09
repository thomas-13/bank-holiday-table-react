import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BankHolidays } from './pages/bankHolidays';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<BankHolidays/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
