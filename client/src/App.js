import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Test from './Test';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/test" component={Test} />
                <Route path="/" exact component={Login} />
            </Switch>
        </Router>
    );
}

export default App;