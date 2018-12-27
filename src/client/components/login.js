import React, { Component } from 'react';
import './register.css'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
//import Welcome from './welcome'
import { userActions } from '../actions';
import { alertActions } from '../actions';
class loginPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(alertActions.logout());

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      username: '',
      password: '',
      submitted: false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    //console.log(this.state)
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    //console.log(dispatch)
    //console.log(this.props.loginState)
    if (username && password) {
      dispatch(userActions.login(username, password));

    }

  }
  handleSignUp() {
    this.props.history.push('/signup');

  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });

  }
  googleLogin() {
    //console.log('hi')
    //window.location = "http://localhost:8000"+ "/auth/google";
  }


  render() {
    const { alert } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className='login-wrapper'>
        {alert.isLogged ? this.props.history.push('/profile') : ""}
        <div className="login-app">


          <span>{alert.message}</span>
          <div style={{marginTop:'-27px',height:'80px',backgroundColor:'rgb(148, 124, 231)'}}>
          <h4 style={{ padding:'33px', color: 'white',fontSize:'20px' }}>Login Form</h4>
          </div>
          

          <div id="login" style={{ fontSize: '15px' }} >


            <form onSubmit={this.handleSubmit}>

              <div className="usrname">
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                <span >
                <FontAwesomeIcon icon={faUser} size="1x" style={{ marginLeft: "-25px", color: "#a2a3a5" }} />
                </span>
                {submitted && !username && <div style={{ fontSize: '12px', color: 'red' }}>Username is required</div>}

                <br />

                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <FontAwesomeIcon icon={faLock} style={{ marginLeft: "-25px", color: "#a2a3a5" }} size="1x" />
                {submitted && !password && <div style={{ fontSize: '12px', color: 'red' }}>password is required</div>}
                <br />
                <button className="button loginBtn" type="submit" value="Log In" >Log In</button>
                <span style={{ marginLeft: "24px" }} >Lost your password ?</span>
              </div>
            </form>
            <div className="line">
              <span>or</span>
            </div>
             
            <button className="button googleBtn" onClick={this.googleLogin} style={{ color: '#ed1212' }}>
            <i className="fa fa-google-plus" style={{color:'red',marginRight:'8px'}}></i> Login with Google</button>
            <br /><br /><br />
          <div style={{marginLeft:'10px'}}>
            <span style={{ fontSize: '20px' }}>not registered ?</span>{" "}
            <input type="submit" value="Sign Up" style={{ color: 'green', backgroundColor: '#3de58e' }} onClick={this.handleSignUp} />
          </div>
            
          </div>
          
        </div>
        {/* } */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alert: state.alert,


})
export default connect(mapStateToProps)(loginPage);
