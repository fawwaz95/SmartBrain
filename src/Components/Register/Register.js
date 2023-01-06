import React, {Component, useState} from 'react';
const PORT = process.env.PORT || 3000;
const REACT_APP_URL = process.env.REACT_APP_URL || `http://localhost:${PORT}`;

class Register extends Component  {

    constructor(props){
        super();
        this.state = {
            inpName: '',
            inpEmail: '',
            inpPassword: '',
            error: ''
        }
    }

    onNameChange = (event) => {
        this.setState({inpName: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({inpEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({inpPassword: event.target.value});
    }


    onSignin = () => {      
            //`http://localhost:${PORT}/register`
            fetch(`${REACT_APP_URL}/register`, {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    id: 1234,
                    name: this.state.inpName,
                    email: this.state.inpEmail,
                    password: this.state.inpPassword,
                })
            }).then(response => response.json())
            .then(data => {
                if(data.error){
                    this.setState({error: data.error})
                }
                if(data.id){
                    this.props.onRouteChange('Home');
                    this.props.loadUser(data);
                }
            })
    }

    render(){
        return (      
            <div>
                <p href="#0" className="f3 link dim white db pointer tr pa4 i" onClick={() => this.props.onRouteChange('Signin')}>Signin</p>
                <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name"
                                    onChange={this.onNameChange}/>
                            </div>
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
                                    onChange={this.onPasswordChange}/>
                            </div>
                            { this.state.error.length > 0 ?
                            <div>
                                <p className="bar error"> {this.state.error}</p>
                            </div> : <div></div>
                            }
                            </fieldset>
                            <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                                onClick={this.onSignin}/>
                            </div>
                        </div>
                    </main>
                </article>
            </div>      
           
        )
    }   
}

export default Register;