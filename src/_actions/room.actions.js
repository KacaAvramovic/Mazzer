import { roomConstants } from '../_constants';
import { roomService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const roomActions = {
    getAll,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        roomService.getAll()
            .then(
                rooms => dispatch(success(rooms)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: roomConstants.GETALL_REQUEST } }
    function success(rooms) { return { type: roomConstants.GETALL_SUCCESS, rooms } }
    function failure(error) { return { type: roomConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        roomService.delete(id)
            .then(
                room => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: roomConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: roomConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: roomConstants.DELETE_FAILURE, id, error } }
}