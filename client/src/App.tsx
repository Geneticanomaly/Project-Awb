import "./App.css";
import Home from "./pages/home/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Onboarding from "./pages/onboarding/Onboarding";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                <Routes>
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Routes>
                    <Route path="/onboarding" element={<Onboarding />} />
                </Routes>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
                <Routes>
                    <Route path="/profile/:userId" element={<Profile />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
