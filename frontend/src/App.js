import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./Pages/DashBoard/Dashboard";
import { LoginContextProvider } from "./Context/LoginContext";
import { UserContextProvider } from "./Context/UserContext";
import { SnackbarProvider } from "./Context/SnackBarContext";
import ChangePasswordPage from "./Pages/ChangePasswordPage/ChangePasswordPage";
import HomePage from "./Pages/HomePage/HomePage";

function App() {
  return (
    <SnackbarProvider>
      <UserContextProvider>
        <LoginContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/changepassword" element={<ChangePasswordPage />} />
            </Routes>
          </BrowserRouter>
        </LoginContextProvider>
      </UserContextProvider>
    </SnackbarProvider>
  );
}

export default App;
