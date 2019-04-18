import { gameConstants } from '../_constants';

export function game(state = {}, action) {
  switch (action.type) {
    case gameConstants.START_REQUEST:
      return {
        loading: true
      };
    case gameConstants.START_SUCCESS:
      return {
        items: action.game
      };
    case gameConstants.START_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}