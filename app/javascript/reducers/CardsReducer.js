export default function cardsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARD_SUCCESS') {
    const { lists } = action.board;
    return lists.reduce((acc, list) => {
      return acc.concat(list.cards);
    }, []);
  } else if (action.type === 'FETCH_CARD_SUCCESS') {
    const filteredCards = state.filter(card => card.id !== action.card.id);
    return filteredCards.concat(action.card);
  } else if (action.type === 'CREATE_CARD_SUCCESS') {
    const newCard = action.card;
    newCard.position = Number(newCard.position);
    newCard.id = Number(newCard.id);
    newCard.list_id = Number(newCard.list_id);

    return state.concat(newCard);
  } else if (action.type === 'UPDATE_CARD_SUCCESS') {
    const newCard = action.card;

    newCard.position = Number(newCard.position);
    newCard.id = Number(newCard.id);
    newCard.list_id = Number(newCard.list_id);

    return state.map(card => {
      if (card.id === newCard.id) {
        return { ...newCard }
      } else {
        return card;
      }
    });
  } else {
    return state;
  }
}
