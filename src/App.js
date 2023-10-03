import React from "react";
import Topbar from "./Components/Topbar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Users from "./Components/Users/Users";
import Products from "./Components/Products/Products";
import Orders from "./Components/Orders/Orders";
import Order from "./Components/OrderDetails/Order";

function App() {
  return (
    <Router>
      <div className="">
        <Topbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/users" component={Users} />
          <Route path="/products" component={Products} />
          <Route path="/orders" component={Orders} />
          <Route path="/order/:orderId" Component={Order} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
