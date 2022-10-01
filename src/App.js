import React, { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { NavbarCompontent } from './components';
import { Home, Sukses } from './pages';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarCompontent />

        <Routes>
          <Route exact path={'/'} element={<Home />} />
          <Route path={'/sukses'} element={<Sukses />} />
        </Routes>

      </BrowserRouter>
    )
  }
}


//! Backend
// json-server --watch db.json --port=3002