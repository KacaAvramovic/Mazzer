import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { roomActions } from '../_actions';


class RoomComponent1 extends React.Component {
  
    handleDeleteRoom(roomId) {
        return (e) => this.props.dispatch(roomActions.delete(roomId));
    }

    handleAddUser(room, user) {
        return (e) => this.props.dispatch(roomActions.addUser(room, user));
    }

    handleLeavingUser(room, user) {
        return (e) => this.props.dispatch(roomActions.removeUser(room, user));
    }

    render() {    
        const {  room , user } = this.props;
    
        return (
            <div className="col-md-4 withborder">
                <div className="col-md-8 roomTitle">{room.name} </div>
                <div className="col-md-4">{ room.playersCount + '/' + room.maxPlayersCount} </div>
                <div className="col-md-12 inlineelements">
                <div className="col-md-4 inlineelement">
                {
                    room.addingUser ? <em> Entering room... </em>
                    : room.addingUserError ? <span className="text-danger">  ERROR: {room.addingUserError}</span>
                    : <span title="Enter room">  
                        <a onClick={this.handleAddUser(room, user)}>                            
                            <img src="./../images/icons/enter.png" alt="Enter room" height="21" width="21"/>      
                        </a>
                      </span>
                }
                </div>
                <div className="col-md-4 inlineelement">
                {
                    room.leavingUser ? <em> Leaving room... </em>
                    : room.leavingUserError ? <span className="text-danger">  ERROR: {room.leavingUserError}</span>
                    : <span title="Leave room">  <a onClick={this.handleLeavingUser(room, user)}>-</a></span>
                }
                </div>
                <div className="col-md-4 inlineelement">
                {
                    room.deleting ? <em>  Deleting...</em>
                    : room.deleteError ? <span className="text-danger">  ERROR: {room.deleteError}</span>
                    : <span title="Delete room">  
                        <a onClick={this.handleDeleteRoom(room.roomId)}>
                            <img src="./../images/icons/trash.png" alt="Delete room" height="21" width="21"/>      
                        </a>
                      </span>
                }
                </div>
                </div>
                <div className="center">
                {
                    room.addingUser ? <em> - Somebodys entering room...</em>
                    : room.addingUserError ? <span className="text-danger"> - ERROR: {room.addingUserError}</span>
                    : isNullOrUndefined(room.players)?<div></div>
                    : <div>{room.players.map((player, index)=><div>{player.username}</div>)} </div>
                }
               </div>
            </div>
        );
    }
}

function isNullOrUndefined(arg) {
    return arg == null;
  }



export const RoomComponent = ({ component: Component, room, user, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <RoomComponent1 room={room} user={user} {...props} {...rest}/>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)