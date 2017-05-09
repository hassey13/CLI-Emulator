export default function directoryReducer(state={}, action){

  switch (action.type) {

    case 'INIT_DIRECTORY':
      return action.payload

    case 'ADD_DIRECTORY':
      return action.payload

    case 'ADD_FILE':
      return action.payload

    case 'CHANGE_DIRECTORY':
      return action.payload

    default:
      return state
  }
}
