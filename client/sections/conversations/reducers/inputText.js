const inputText = (state = { value: '' }, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT_INPUT':
      return { value: action.value };

    default:
      return state;
  }
};

export default inputText;
