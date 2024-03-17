import classes from './cards.module.css'
import React from 'react';

class CardItem extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteCard = (e) => {
    e.preventDefault();

    this.props.actions.deleteCard(this.props.id);
  }

  render() {
    return (
      <li className={classes["item"]}>
        <span className={classes["itemLabel"]}>{this.props.content}</span>
        <button type="button" className={classes["itemDeleteButton"]} onClick={this.deleteCard}>✖</button>
      </li>
    );
  }
}

export default CardItem;
