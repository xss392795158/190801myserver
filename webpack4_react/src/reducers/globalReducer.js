

export function reducer(state = {show: false}, action) {
  switch (action.type) {
    case 'TOGGLE_RESULT':
      return {
        ...state,
        show: action.show,
        status: action.status
      }
  }

  return state
}
