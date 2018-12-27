import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Link } from 'react-router-dom'
import '../CSS/profileBoard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';


class profileBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

 
  render() {
    const { loginRetrieveData } = this.props;
    const { alert } = this.props;
    // console.log("alert.is",alert.isLogged)
    //console.log("profile board========", loginRetrieveData)

    return (
      <React.Fragment>
        {loginRetrieveData.map((obj) =>
          <div key={obj.user.id} className="profile-wrapper">

            <div className="sidenav">

              <div className="pic">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img className='profile-pic' src={obj.user.profileImage} alt="profilePic" />

                  <h3 style={{ flex: 1 }}> {obj.user.firstname} {" "} {obj.user.lastname} </h3>
                </span>
              </div>


              <a href="#">Menu 1</a>
              <a href="#">menu 2</a>
              <a href="#">menu 3</a>
            </div>

            <div className="menu-content-wrapper">
              <div className="content-header">
                <Link to="/login">Logout</Link>
                {!alert.isLogged ? this.props.history.push('/login') : ""}
              </div>
              <div className="menu-content">
                <h2>content</h2>
                <h3>select a .csv file</h3>
                
              </div>
            </div>

          </div>

        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  loginRetrieveData: state.logins,
  alert: state.alert

})

export default connect(mapStateToProps)(profileBoard);
