import React, { useState, useEffect } from 'react';
import { createStore } from 'redux'
import { connect } from 'react-redux'
import Home from './component/Home'
import { useHistory } from "react-router-dom";

import 'antd/dist/antd.css';
import './App.css';


import { Route, Switch, Redirect, useParams  } from "react-router-dom"
 
const App = (props) => {

  let time  = new Date();
  let year
  let month
  let path
  year = time.getFullYear()
  month = String(time.getMonth() + 1).padStart(2, '0') ;
  path  = `/year/${year}/month/${month}`

 


    return (
      <div>
        <Switch>
        <Route exact path="/year/:year/month/:month"  component={Home} />
        <Route path="*" component={Home}>
        <Redirect  to={path} />
          
          </Route>
        </Switch>
      </div>
      
    );
  }

  
export default App;
