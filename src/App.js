import './App.css';
import Header from './Components/Reusable/Header/Header';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Basket from './Components/Basket/Basket';
import SignIn from './Components/SignIn/SignIn';
import Footer from './Components/Reusable/Footer/Footer';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import './responsive.css';
import { auth } from './firebase.config';
import { useStateValue } from './Components/StateProvider/StateProvider';
import { useEffect } from 'react';
import Checkout from './Components/Checkout/Checkout';
import Error from './Components/Error/Error';
import ProductsByCategories from './Components/Home/ProductsByCategories/ProductsByCategories';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PrivateRoute from './Components/Reusable/PrivateRoute/PrivateRoute';
import jwtDecode from "jwt-decode";
import Search from './Components/Search/Search';

const promise = loadStripe("pk_test_51IdfRoF1fXyFzjChI92Hjve7nRNhNen4D35kH4kxQCJ3KHWY8jEPPN05nmjIhCNyCdBjYA0euNJx9RyPau1PDv7F00B0qN62u5")

function App() {

  const [{ cart }, dispatch] = useStateValue()

  // Filter user data form user
  const getUserForStoredUser = user => {
    const { name, email, picture, user_id } = user
    return { name, email, photo: picture, userId: user_id }
  }

  // Catch logged in user and set logged user in state
  useEffect(() => {
    if (localStorage.getItem('asrafuls-amazon-user-token')) {
      const storedUser = jwtDecode(localStorage.getItem('asrafuls-amazon-user-token'))
      dispatch({
        type: "SET_USER",
        user: getUserForStoredUser(storedUser)
      })
    } else {
      dispatch({
        type: "SET_USER",
        user: null
      })
    }
  }, [auth, dispatch])

  // store cart items in localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("asrafuls-ama-cart-items", JSON.stringify(cart))
    } else if ([]) {
      localStorage.setItem("asrafuls-ama-cart-items", JSON.stringify(cart))
    }
  }, [cart])

  return (
    // BEM
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <SignIn />
            </Route>
            <Route exact path="/user/cart">
              <Header />
              <Basket />
            </Route>
            <PrivateRoute path="/user/cart/items/checkout">
              <Header />
              <Elements stripe={promise} >
                <Checkout />
              </Elements>
            </PrivateRoute>
            <Route path="/search">
              <Header />
              <Search />
            </Route>
            <Route path="/products/:pdsCate">
              <Header />
              <ProductsByCategories />
            </Route>
            <Route path="/product/:pdCate/:pdId">
              <Header />
              <ProductDetails />
            </Route>
            <Route exact path="/">
              <Header />
              <Home />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

//       ###         #############    ########             ###         ##########     ##         ##     ##             
//     ##   ##       ##         ##    ##      ##         ##   ##       ##             ##         ##     ##             
//    ##     ##                 ##    ##       ##       ##     ##      ##             ##         ##     ##             
//   ###########     #############    ##     ##        ###########     ######          ##        ##     ##             
//  ##         ##    ##               ##  ##          ##         ##    ##               ##      ##      ##             
//  ##         ##    ##         ##    ##    ##        ##         ##    ##                ##    ##       ##       ##    
//  ##         ##    #############    ##      ##      ##         ##    ##                  ####         ###########    
//                                                                                                                     
// https://mxasraful.com                                                                                               
// https://asrafulweb.com                                                                                              