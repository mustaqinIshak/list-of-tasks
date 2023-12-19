import logo from './logo.svg';
import './App.css';
import { Routes } from './routes/Index';

function App() {
  return (
    <Routes isAuthorized={true} />
  );
}

export default App;
