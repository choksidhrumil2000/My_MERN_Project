import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import DashBoard from './Components/DashBoard/Dashboard';
import { LoginContextProvider } from './Context/LoginContext';
import { UserContextProvider } from './Context/UserContext';
import { SnackbarProvider } from './Context/SnackBarContext';

function App() {
  return (
    <SnackbarProvider>
      <UserContextProvider>
    <LoginContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />}/>
        <Route path="/dashboard" element={<DashBoard />}/>
      </Routes>
    </BrowserRouter>
    </LoginContextProvider>
    </UserContextProvider>
    </SnackbarProvider>
  );
}

export default App;
