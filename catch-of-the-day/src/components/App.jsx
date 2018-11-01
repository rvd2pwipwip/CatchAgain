import React, { Component } from "react";
import Order from "./Order";
import Inventory from "./Inventory";
import Header from "./Header";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
}

export default App;
