import { roomConstants } from '../_constants';

export function rooms(state = {}, action) {
  switch (action.type) {
    case roomConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case roomConstants.GETALL_SUCCESS:
      return {
        items: action.rooms
      };
    case roomConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case roomConstants.ENTER_REQUEST:
      return {
        entering: true
      };
    case roomConstants.ENTER_SUCCESS:
      return {
      };
    case roomConstants.ENTER_FAILURE:
      return { 
        error: action.error
      };
    case roomConstants.DELETE_REQUEST:
      // add 'deleting:true' property to room being deleted
      return {
        ...state,
        items: state.items.map(room =>
          room.id === action.id
            ? { ...room, deleting: true }
            : room
        )
      };
    case roomConstants.DELETE_SUCCESS:
      // remove deleted room from state
      return {
        items: state.items.filter(room => room.id !== action.id)
      };
    case roomConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to room 
      return {
        ...state,
        items: state.items.map(room => {
          if (room.id === action.id) {
            // make copy of room without 'deleting:true' property
            const { deleting, ...roomCopy } = room;
            // return copy of room with 'deleteError:[error]' property
            return { ...roomCopy, deleteError: action.error };
          }

          return room;
        })
      };
    default:
      return state
  }
}