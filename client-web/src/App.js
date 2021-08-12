import React, { useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

//components
import Navbar from "./components/NavBar";
import Footer from './components/Footer'
import HomePageComponent from './components/HomePageComponent';
import AllResturantComponent from './components/AllResturantComponent';
import ResturantComponent from './components/ResturantComponent';
import ResturantMenu from './components/ResturantMenu';


//context
import { UserContext } from './Context/UserContext';


import ResturantBranches from './components/ResturantBranches';
import ResturantInfo from './components/ResturantInfo';

function App() {
  const [ order, setOrder ] = useState({
    resturant: '',
    order: []
  })
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
          <Route path="/resturant/:resturantName"  >
            <ResturantComponent />
            <Switch>
              <Route path="/resturant/:resturantName/menu" >
                <ResturantMenu order={order} setOrder={setOrder} />
              </Route>
              <Route path="/resturant/:resturantName/about" >
                <ResturantInfo />
              </Route>
              <Route path="/resturant/:resturantName/branches" >
                <ResturantBranches />
              </Route>
            </Switch>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
