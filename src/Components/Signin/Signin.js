import { render } from '@testing-library/react';
import React, {Component} from 'react';
import './Signin.css';

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || `http://localhost:${PORT}`;

class Signin extends Component {
    constructor(props){
        super();
        this.state = {
            signInEmail: '',
            signInPassword: '',
            error: ''
        }
      }

onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
}

onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
}

onSubmitSignin = () => {
    fetch(`${URL}/signin`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword,
        })
    }).then(response => response.json())
      .then(data => {
        if(data.error){
            console.log('Error ' + data.error);
            this.setState({error: data.error});
        }

        if(data.email){
            this.props.onRouteChange("Home");
            this.props.loadUser(data);
        }
      }).catch(err => console.log('Some error ') + err);
}

 render(){
    const { onRouteChange } = this.props;
        return (
            <div >
                <p href="#0" className="f3 link dim white db pointer tr pa4 i" onClick={() => onRouteChange('Register')}>Register</p>
                <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center signinBox">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                                />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                                />
                        </div>
                        { this.state.error.length > 0 ?
                        <div>
                            <p className="bar error"> {this.state.error}</p>
                        </div> : <div></div>
                        }
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={() => this.onSubmitSignin()}/>
                        </div>
                        <div className="lh-copy mt3">
                        <p href="#0" className="f6 link dim black db grow pointer" onClick={() => onRouteChange('Register')}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
            </div>
 
        );
    }
}

export default Signin;