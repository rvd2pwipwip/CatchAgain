import React, { Component } from "react";
import Order from "./Order";
import Inventory from "./Inventory";
import Header from "./Header";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };
  componentDidMount() {
    const { params } = this.props.match; //destructured params
    //first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    //only sync storeName/fishes in firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    }); //not same ref as react refs
  }

  componentDidUpdate() {
    const { params } = this.props.match; //destructured params
    //key:value = storeName:order
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref); //remove binding when user leaves app
  }

  addFish = fish => {
    //1.copy existing state
    const fishes = { ...this.state.fishes };
    //2.add new fish object to fishes objects (bracket notation and date key)
    fishes[`fish${Date.now()}`] = fish;
    //3.set new fishes object to state
    this.setState({ fishes });
    // console.log("adding a fish");
  };
  updateFish = (key, updatedFish) => {
    //1.copy current state
    const fishes = { ...this.state.fishes };
    //2.update that state
    fishes[key] = updatedFish;
    //3.set new fishes object to state
    this.setState({ fishes });
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
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
        />
      </div>
    );
  }
}

export default App;
