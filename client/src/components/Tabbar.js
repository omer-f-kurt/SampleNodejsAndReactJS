import React from 'react';
import { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTab } from '../actions';

class Tabbar extends Component {
  render() {
    return (
        <ul className="nav nav-tabs nav-justified">
            <li role="presentation" className={this.props.selected == 'Signin' ? 'active' : ''}><a onClick={() => this.props.changeTab('Signin')}>Sign in</a></li>
            <li role="presentation" className={this.props.selected == 'Signup' ? 'active' : ''}><a onClick={() => this.props.changeTab('Signup')}>Sign up</a></li>
        </ul>
    )
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        changeTab: changeTab
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Tabbar);
