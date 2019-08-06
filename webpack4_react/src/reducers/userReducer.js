

export function reducer(state = {name: 'redux'}, action) {
  switch (action.type) {
    case 'CHANGE_USER_NAME':
      return {
        ...state,
        name: action.name
      }
  }

  return state
}
