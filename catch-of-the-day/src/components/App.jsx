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
  //sync firebase and app state
  componentDidMount() {
    const { params } = this.props.match; //destructured params
    //first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    //store ref to be able to remove it on unmount
    //only sync storeName/fishes in firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    }); //not same ref as react refs
  }
  //save data to browser local storage
  componentDidUpdate() {
    const { params } = this.props.match; //destructured params
    //key:value = storeName:order
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }
  //unlisten to clear memory
  componentWillUnmount() {
    base.removeBinding(this.ref); //remove binding when user leaves app
  }

  addFish = fish => {
    //1.copy existing state
    const fishes = { ...this.state.fishes };
    //2.add new fish object to fishes objects (bracket notation and date key)
    fishes[`fish${Date.now()}`] = fish;
    //3.set new fishes object to state
    this.setState({ fishes }); // == fishes: fishes in es6 when property name == value name
  };
  updateFish = (key, updatedFish) => {
    //1.copy current state
    const fishes = { ...this.state.fishes };
    //2.update that state
    fishes[key] = updatedFish;
    //3.set new fishes object to state
    this.setState({ fishes });
  };
  deleteFish = key => {
    //1.copy current state
    const fishes = { ...this.state.fishes };
    //2.delete the fish
    fishes[key] = null; //firebase requires null to remove data
    //3.set new fishes to object state
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
  removeFromOrder = key => {
    //1.copy existing state
    const order = { ...this.state.order };
    //2.remove item from order
    delete order[key]; //not mirroring to firebase, can use delete
    //3.set new fishes to object state
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
        {/* <Order {...this.state} /> can be used but passes entire state */}
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          removeFromOrder={this.removeFromOrder}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
