import React from 'react';
import { Component } from 'react';

export default class Home extends Component {
    render() {
        if (this.props.userName != "") {
            return (
                <p className="lead">
                {this.props.userName} thank you for visiting us! You have logged in {this.props.loginCount} times, and total time spent on our site being {this.props.loginMinutes} minutes.
                </p>
            )
        }else {
            return (
                <p className="lead">
                There are now {this.props.registeredUsersCount} registered users and {this.props.anonymousUsersCount} guests visiting our site.
                </p>
            )
        }
    }
}
