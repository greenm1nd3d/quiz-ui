import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AdminPage from "./components/AdminPage";
import ProductsPage from "./components/ProductsPage";

import GlobalState from "./contexts/GlobalState";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App(props) {
  return (
    <GlobalState>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ProductsPage} />
          <Route path="/admin" component={AdminPage} />
        </Switch>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
