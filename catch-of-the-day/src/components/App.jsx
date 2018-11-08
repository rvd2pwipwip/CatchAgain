import React, { Component } from "react";
import Order from "./Order";
import Inventory from "./Inventory";
import Header from "./Header";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

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
  addToOrder = fish => {
    //1.copy existing state
    const order = { ...this.state.order };
    //2.either add to or update the number of order
    order[fish] = order[fish] + 1 || 1;
    //3.set new fishes object to state
    this.setState({ order });
  };
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(fish => (
              <Fish
                key={fish}
                fish={fish}
                details={this.state.fishes[fish]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
