import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { RoomComponent, CreateRoomComponent }  from '../_components'
import { roomActions } from '../_actions';


class RoomsPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(roomActions.getAll());
    }

    handleDeleteRoom(id) {
        return (e) => this.props.dispatch(roomActions.delete(id));
    }

    render() {
        const { user, rooms } = this.props;
        return (
            <div className="col-md-12">
                <h1>Hi {user.username}!</h1>
                <h3>Pick a room or create a new one:</h3>
                {rooms.loading && <em>Loading rooms...</em>}
                {rooms.error && <span className="text-danger">ERROR: {rooms.error}</span>}
                {rooms.items &&
                    <ul>
                        {rooms.items.map((room, index) =>
                            <RoomComponent room={room} user={user}/>                                
                        )}
  
                    </ul>
                }                
                <CreateRoomComponent user={user}/>     
                <div class="col-md-12">
                    <Link to="/login">Logout</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { rooms , authentication } = state;
    return {
        rooms,
        user: authentication.user
    };
}

const connectedRoomsPage = connect(mapStateToProps)(RoomsPage);
export { connectedRoomsPage as RoomsPage };