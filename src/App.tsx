import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./constants.css";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login/Login";
import NotFound from "./pages/errors/404/404";
import Register from "./pages/auth/Register/Register";
import EmailValidation from "./pages/auth/EmailValidation/EmailValidation";
import DashboardWrapper from "./components/wrappers/Dashboard/DashboardWrapper";
import DashboardHome from "./pages/dashboard/Home/Home";
import Main from "./components/wrappers/Main/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register">
          <Route path="" element={<Register />} />
          <Route path="confirm-email" element={<EmailValidation />} />
        </Route>
        <Route path="dashboard" element={<DashboardWrapper />}>
          <Route path="" element={<DashboardHome />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
