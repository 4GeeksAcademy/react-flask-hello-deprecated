import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import injectContext from './store/appContext';
import Home from './pages/Home';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import Profile from './pages/Profile';
import PrivateRoute from './component/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default injectContext(App);



