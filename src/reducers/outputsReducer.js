export default function outputsReducer(state=[], action){

  switch (action.type) {

    case 'ADD_COMMAND':
      return [ ...state , action.payload]

    case 'ADD_OUTPUT':
      return [ ...state , action.payload]

    case 'CLEAR_OUTPUT':
      return []

    default:
      return state
  }
}
