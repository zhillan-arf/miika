import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Aigis from './components/Aigis';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Aigis/>}/>
                <Route path='/register' exact element={<Register/>}/>
                <Route path='/aigis' exact element={<Aigis/>}/>
                <Route path='*' exact element={<Aigis/>}/>
            </Routes>
        </Router>
    );
}

export default App;