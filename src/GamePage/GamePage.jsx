import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { GameComponent }  from '../_components'
import { gameActions } from '../_actions';


class GamePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(gameActions.start());
    }

    render() {
        const { user, game } = this.props;
        return (
            <div className="col-md-12">
                <h1>Hi {user.username}!</h1>
                {game.loading && <em>Loading games...</em>}
                {game.error && <span className="text-danger">ERROR: {game.error}</span>}
                 MAZE
                <div class="col-md-12">
                    <Link to="/login">Logout</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { game , authentication } = state;
    return {
        game,
        user: authentication.user
    };
}

const connectedGamePage = connect(mapStateToProps)(GamePage);
export { connectedGamePage as GamePage };