import React from 'react';
import { Component } from 'react';

import Tabbar from './Tabbar';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

export default class SigninSignup extends Component {
    render() {
        var innerContent = null;
        if (this.props.selected == 'Signin') {
            innerContent = <SigninForm />;
        }else{
            innerContent = <SignupForm />;
        }
        return(
            <div>
                <Tabbar {...this.props} />
                {innerContent}
            </div>
        )
    }
}
