import React from 'react'

import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom'

import Task1 from './Task1'
import Task2 from './Task2'
import Task3 from './Task3'
import Task4 from './Task4'
import history from '../utils/history'

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Task1} />
      <Route path="/task2" component={Task2} />
      <Route path="/task3" component={Task3} />
      <Route path="/task4" component={Task4} />
      <Redirect to="/" />
    </Switch>
  </Router>
)

export default App
