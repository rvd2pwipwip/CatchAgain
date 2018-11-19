import React, { Component } from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };
    //make sure fish is loaded from firebase before continuing
    if (!fish) return null;
    if (isAvailable) {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 500, exit: 500 }}
        >
          {/* <CSSTransition {...transitionOptions}> */}
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count" //count-enter, count-enter-active etc
                  key={count} //CSSTransition will create 2 different <span/> elements
                  timeout={{ enter: 500, exit: 500 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              {`lbs ${fish ? fish.name : "fish"}
               ${formatPrice(count * fish.price)}`}
            </span>
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </li>
        </CSSTransition>
      );
    }
    return (
      // <CSSTransition
      //   classNames="order"
      //   key={key}
      //   timeout={{ enter: 500, exit: 500 }}
      // >
      <CSSTransition {...transitionOptions}>
        <li key={key}>{`Sorry, ${
          fish.name ? fish.name : "fish"
        } is no longer available`}</li>
      </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>

        <div className="total">
          Total:
          <strong>{` ${formatPrice(total)}`}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
