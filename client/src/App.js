import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MarketTContPage } from "./pages/MarketTContPage.jsx";
import { ClubTContPage } from "./pages/ClubTContPage.jsx";
import { ClubOneContPage } from "./pages/ClubOneContPage.jsx";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Club from "./Pages/Club";
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarketTContPage />} />
        <Route path="/market/totalcontents" element={<MarketTContPage />} />
        <Route path="/club/totalcontents" element={<ClubTContPage />} />
        <Route path="/club/onecontent" element={<ClubOneContPage />} />
           <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/club" element={<Club />} />
      </Routes>
    </Router>
  );
}
export default App;
