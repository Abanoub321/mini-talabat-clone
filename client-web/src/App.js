import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

//components
import Navbar from "./components/NavBar";
import HomePageComponent from './components/HomePageComponent';
import AllResturantComponent from './components/AllResturantComponent';

//context
import { UserContext } from './Context/UserContext';

function App() {

  const userReducer = (state, action) => {
    if (action.type === 'Add_Adress')
      return {
        ...state,
        address: action.payload
      };
    else
      return undefined
  }

  const [user, dispatchUser] = useReducer(userReducer, UserContext._currentValue);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user }}>
          <Navbar />
        </UserContext.Provider>
        <Switch>
          <Route exact path="/" >
            <UserContext.Provider value={{ user, dispatchUser }}>
              <HomePageComponent />
            </UserContext.Provider>
          </Route>
          <Route path="/all" >
            <AllResturantComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;