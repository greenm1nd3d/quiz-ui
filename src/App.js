import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./components/Home";
import QuestionsPage from "./components/QuestionsPage";

import GlobalState from "./contexts/GlobalState";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App(props) {
    return (
        <GlobalState>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/quiz/:id" component={QuestionsPage} />
                </Switch>
            </BrowserRouter>
        </GlobalState>
    );
}

export default App;
