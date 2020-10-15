import React  from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "./components/pages/homePage";
import Register from "./components/accounts/register1";
import Login from "./components/accounts/login1";
import CompleteRegister from "./components/hotels/CompleteRegistration";
import HotelHomePage from "./components/hotels/hotelwithAPI/HotelHomePage";
import HotelHomePage1 from "./components/hotels/hotelwithNoAPI/HotelHomePage";
import LoadHotelHomePage from "./components/hotels/LoadHotelHomePage";
import AdminHomePage from "./components/hotels/hotelAdmin/AdminHomePage";
// import LoadHotels from "./components/hotels/loadHotel";
// import Hotel from "./components/hotels/hotel";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/complete-register" exact component={CompleteRegister}/>
          <Route path="/hotel" exact component={HotelHomePage}/>
          <Route path="/loadhotels" exact component={LoadHotelHomePage}/>
          <Route path="/hotels/admin/:slug" component={AdminHomePage}/>
          <Route path="/hotels/:slug" component={HotelHomePage1}/>
        </Switch>
      </Router>
  );
}

export default App;
