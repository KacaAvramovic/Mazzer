import { gameConstants } from '../_constants';
import { gameService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const gameActions = {
    start
};

function start() {
    return dispatch => {
        dispatch(request());

        gameService.start()
            .then(
                game => dispatch(success(game)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: gameConstants.START_REQUEST } }
    function success(game) { return { type: gameConstants.START_SUCCESS, game } }
    function failure(error) { return { type: gameConstants.START_FAILURE, error } }
}
