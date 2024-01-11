import './App.css';
import Home from './pages/home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Dashboard from './pages/dashboard/Dashboard';
import Onboarding from './pages/onboarding/Onboarding';
import MobileMatchContainer from './components/matches/mobile/MobileMatchContainer';
import Chat from './pages/chat/Chat';
import {useCookies} from 'react-cookie';

function App() {
    const [cookies] = useCookies(['UserId', 'AuthToken']);

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
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Routes>
                    {cookies.AuthToken && <Route path="/onboarding" element={<Onboarding />} />}
                </Routes>
                <Routes>
                    {cookies.AuthToken && <Route path="/dashboard" element={<Dashboard />} />}
                </Routes>
                <Routes>
                    {cookies.AuthToken && <Route path="/profile/:userId" element={<Profile />} />}
                </Routes>
                <Routes>
                    {cookies.AuthToken && (
                        <Route path="/matches" element={<MobileMatchContainer />} />
                    )}
                </Routes>
                <Routes>
                    {cookies.AuthToken && <Route path="/chat/:userId" element={<Chat />} />}
                </Routes>
            </Router>
        </>
    );
}

export default App;
