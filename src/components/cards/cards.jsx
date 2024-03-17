import classes from './cards.module.css'
import React from 'react';
import CardItem from "./card-item.jsx";

class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.url = 'http://localhost:7070/notes';
    this.state = {
      cards: [],
      newContent: '',
    };
  }

  componentDidMount() {
    this.loadCards();
  }

  loadCards() {
    fetch(this.url, {method: 'GET'})
      .then(response => response.json())
      .then(data => this.setState({cards: data}));
  }

  addCard = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: this.state.newContent })
    };

    fetch(this.url, requestOptions)
      .then(response => response.json())
      .then(() => {
        this.setState({newContent: ''});
        this.loadCards();
      });
  }

  deleteCard = (id) => {
    fetch(this.url + `?id=${id}`, {method: 'DELETE'})
      .then(response => response.json())
      .then(() => {
        this.loadCards();
      });
  }

  inputChange = (e) => {
    e.preventDefault();
    const {name, value } = e.target;

    this.setState({
        [name]: value,
      }
    );
  }

  render() {
    return (
      <div className={classes["cardsContainer"]}>
        <div className={classes["cardsTopPanel"]}>
          <div className={classes["cardsTopPanelCaption"]}>Notes</div>
          <button type="button" className={classes["updateButton"]} onClick={() => this.loadCards()}></button>
        </div>
        <ul className={classes["items"]}>
          {this.state.cards.map(item =>
            <CardItem
              key={item.id}
              id={item.id}
              content={item.content}
              actions={{deleteCard: this.deleteCard}}
            />)}
        </ul>
        <form className={classes["newCardForm"]} onSubmit={this.addCard}>
          <label>
            New note
            <textarea name="newContent" value={this.state.newContent} onChange={this.inputChange} required/>
          </label>
          <button type="submit" className={classes["addButton"]}>➤</button>
        </form>
      </div>
    );
  }
}

export default Cards;
