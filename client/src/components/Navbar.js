import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTab, signout } from '../actions';

class Navbar extends Component {
    render() {
        var signinSignout = null;
        if (this.props.token) {
            signinSignout = <li><a onClick={() => this.props.signout()}>Signout</a></li>;
        }else{
            signinSignout = <li className={this.props.selected == 'Home' ? '' : 'active'}><a onClick={() => this.props.changeTab('Signin')}>Signin</a></li>;
        }
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">SeekPanda</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className={this.props.selected == 'Home' ? 'active' : ''}><a onClick={() => this.props.changeTab('Home')}>Home</a></li>
                            {signinSignout}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        changeTab: changeTab,
        signout: signout
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Navbar);
