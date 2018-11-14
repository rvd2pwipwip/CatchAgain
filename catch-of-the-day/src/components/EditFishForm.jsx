import React, { Component } from "react";

class EditFishForm extends Component {
  handleChange = e => {
    //update this fish
    //1.take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      //computed property names to update corresponding prop
      [e.currentTarget.name]: e.currentTarget.value
    };
    //2.update fish values
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={this.props.fish.name}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="price"
          value={this.props.fish.price}
          onChange={this.handleChange}
        />
        <select
          type="text"
          name="status"
          value={this.props.fish.status}
          onChange={this.handleChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={this.props.fish.desc}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="image"
          value={this.props.fish.image}
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
