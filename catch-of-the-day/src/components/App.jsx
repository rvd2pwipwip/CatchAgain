import React, { Component } from "react";
import Order from "./Order";
import Inventory from "./Inventory";
import Header from "./Header";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };
  addFish = fish => {
    //1.copy existing state
    const fishes = { ...this.state.fishes };
    //2.add new fish object to fishes objects (bracket notation and date key)
    fishes[`fish${Date.now()}`] = fish;
    //3.set new fishes object to state
    this.setState({ fishes });
    // console.log("adding a fish");
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
