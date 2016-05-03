
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../actions';
import { bindActionCreators } from 'redux';

class SigninForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }
    
    onSubmit(e){
        e.preventDefault();
        this.props.authenticate(this.state.userName, this.state.password);
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.onSubmit.bind(this)}>
                <h2 className="form-signin-heading">Please sign in</h2>
                <label htmlFor="inputEmail" className="sr-only">User Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                    autofocus=""
                    value={this.state.userName}
                    onChange={(event) => this.setState({userName: event.target.value})}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(event) => this.setState({password: event.target.value})}/>
                <button className="btn btn-lg btn-primary btn-block" type="submit" style={{marginTop: 20}}>Sign in</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        authenticate: authenticate
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(SigninForm);
