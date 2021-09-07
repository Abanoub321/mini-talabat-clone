import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

//components
import Navbar from "./components/NavBar";
import Footer from './components/Footer'
import HomePageComponent from './components/HomePageComponent';
import AllResturantComponent from './components/AllResturantComponent';
import ResturantComponent from './components/ResturantComponent';
import ResturantMenu from './components/ResturantMenu';
import CheckoutComponent from './components/CheckoutComponent';

import ResturantBranches from './components/ResturantBranches';
import ResturantInfo from './components/ResturantInfo';



const reducer = (state, action) => {
  switch (action.type) {
    case 'add-dish':
      {
        const { quantity, restId, dish } = action.payload;

        if (quantity == 0)
          return state;
        let newOrder = state.order;
        if (newOrder.length == 0) {
          if (state.resturant != restId) {
            let order = [{ ...dish, quantity }];
            return {
              ...state,
              resturant: restId,
              order,

            }
          }
        }

        let newDish = { ...dish, quantity, resturant: restId };
        newOrder.push(newDish)
        return { ...state, order: newOrder }

      }
    case 'login': {
      const { token, user } = action.payload.data;
      localStorage.setItem('access-token', JSON.stringify(token));
      console.log(user);
      let newUser = {
        name: user.name,
        token,
        phone: user.phoneNo
      }
      return { ...state, user: newUser }
    }
    case 'logout': {
      localStorage.removeItem('access-token')
      return {
        ...state, user: {
          name: '',
          token: '',
          phone: ''
        }
      }
    }
    case 'Check-Token': {

      if (action.payload.exist)
        return {
          ...state,
          user: action.payload.user
        }
      else
        return { ...state }



    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    resturant: '',
    order: [],
    user: {
      name: '',
      token: '',
      phone: ''
    }
  })
  useEffect(() => {
    CheckToken();
  }, [])

  const CheckToken = async () => {
    const saved = localStorage.getItem('access-token');
    const value = JSON.parse(saved);

    if (!value) {
      dispatch({ type: 'Check-Token', payload: { exist: false } })
    }
    else {
      fetch(`${process.env.REACT_APP_BASE_URL}/user/`, {
        method: 'get',
        headers: {
          'authorization': 'Bearer ' + value
        }
      }).then(response => response.json())
        .then(data => {
          const { name, phoneNo } = data.user;
          // stuck in here
          console.log(data.user);
          let newUser = {
            name: name,
            token: value,
            phone: phoneNo
          };
          dispatch({ type: 'Check-Token', payload: { exist: true, user: newUser } })
        })
    }
  }
  return (
    <Router>
      <div className="App">

        <Navbar numberOfDishes={state.order.length} dispatch={dispatch} userName={state.user.name} />

        <Switch>
          <Route exact path="/" >
            <HomePageComponent />
          </Route>

          <Route path="/all" >
            <AllResturantComponent />
          </Route>

          <Route path="/resturant/:resturantName" >
            <ResturantComponent />
            <Switch>
              <Route path="/resturant/:resturantName/menu" >
                <ResturantMenu dispatch={dispatch} />
              </Route>
              <Route path="/resturant/:resturantName/about" >
                <ResturantInfo />
              </Route>
              <Route path="/resturant/:resturantName/branches" >
                <ResturantBranches />
              </Route>
            </Switch>
          </Route>

          <Route path='/checkout'>
              <CheckoutComponent userName = {state.user.name} order={state.order} />
          </Route>

        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
