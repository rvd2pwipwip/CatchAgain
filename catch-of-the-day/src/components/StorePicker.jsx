import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };
  myInput = React.createRef();
  goToStore = e => {
    //stop the form from submitting
    e.preventDefault();
    //get text from input
    const storeName = this.myInput.value.value;
    //change url to /store/inputvalue
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
