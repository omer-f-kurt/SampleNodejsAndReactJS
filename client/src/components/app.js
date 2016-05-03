import React from 'react';
import { Component } from 'react';

import io from 'socket.io-client';

import Navbar from './Navbar';
import Home from './Home';
import SigninSignup from './SigninSignup'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registeredUsersCount } from '../actions'


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            registeredUsersCount: 0,
            anonymousUsersCount: 0
        }
    }

    componentDidMount(){
        // this.props.registeredUsersCount();
    }

    componentWillReceiveProps(nextProps){
        if (this.props.appState.token != nextProps.appState.token) {
            console.log('should call login with ' + nextProps.appState.userName);
            if (nextProps.appState.token) {
                this.socket.emit('LOGIN', nextProps.appState.userName);
            }else{
                this.socket.emit('LOGIN', 'anonymous');
            }
        }
    }

    componentDidMount(){
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect.bind(this));
        this.socket.on('CURRENT_USERS', this.currentUsers.bind(this));
    }

    connect(){
        console.log(this.socket.id);
        this.socket.emit('LOGIN', 'anonymous');
    }

    currentUsers(payload){
        console.log(payload);
        this.setState({anonymousUsersCount: payload.anonymousUserCount, registeredUsersCount: payload.registeredUsers});
    }

    render() {
        var innerContent = null;
        if (this.props.appState.currentPage == 'Home') {
            innerContent = <Home userName={this.props.appState.userName}
                                 loginCount={this.props.appState.loginCount}
                                 registeredUsersCount={this.state.registeredUsersCount}
                                 anonymousUsersCount={this.state.anonymousUsersCount}
                                 loginMinutes={this.props.appState.loginMinutes}/>
        }else{
            innerContent = <SigninSignup selected={this.props.appState.currentPage}/>
        }
        console.log(this.props.appState);
        return (
                <div>
                    <Navbar selected={this.props.appState.currentPage} token={this.props.appState.token}/>
                    <div className="container" style={{marginTop: 60}}>
                        {innerContent}
                    </div>
                </div>
            );
    }
}

function mapStateToProps (state){
    return {
        appState: state.appState
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        registeredUsersCount: registeredUsersCount
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
