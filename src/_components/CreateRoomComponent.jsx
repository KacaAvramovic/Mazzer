import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { roomActions } from '../_actions';


class CreateRoomComponent1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRoom: {
                Title: "",
                PlayersCount: 0
            }
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePlayersCountChange = this.handlePlayersCountChange.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
    }

    handleCreateRoom(room, user) {
        return (e) => this.props.dispatch(roomActions.create(this.state.newRoom, user));
    }

    handleTitleChange(e) {
        var newRoomState = this.state.newRoom;
        var Title = e.target.value;
        this.setState({ newRoom : {...newRoomState, Title}});
    }

    handlePlayersCountChange(e) {
        newRoom.playersCount = e.target.value;
        this.setState({ newRoom: newRoom });
    }

    render() {    
        const { currentUser, submitted, newRoom } = this.props;
    
        return (
            <div className="col-md-4 withborder">

                <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !title ? ' has-error' : '')}>
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" name="title" onChange={this.handleTitleChange}  />
                            {submitted && !title &&
                                <div className="help-block">Title is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !playersCount ? ' has-error' : '')}>
                            <label htmlFor="playersCount">Players Count</label>
                            <input type="text" className="form-control" name="playersCount" onChange={this.handlePlayersCountChange} />
                            {submitted && !playersCount &&
                                <div className="help-block">Players Count is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <span title="Create room">  
                                <a onClick={this.handleCreateRoom(newRoom, currentUser)}>
                                    <img src="./../images/icons/plus.png" alt="Create room" height="21" width="21"/>                           
                                </a>
                            </span>                           
                        </div>
                </form>
                    
            </div>           
        );
    }
}

export const CreateRoomComponent = ({ component: Component, room, user, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <CreateRoomComponent1 room={room} user={user} {...props} {...rest}/>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)