import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Container from "../Container/Container";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Container/>
                <Switch>
                    <Route exact path='/' component={Container}/>
                </Switch>
            </div>
        </Router>);
}

export default App;
