import React, { Component } from 'react'
import { connect } from 'react-redux';


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { regisState } = this.props;

    console.log("welcome========", regisState)
    // {regisState.length ? regisState : {...regisState,loginRetrieveData} }
    return (
      // <div>
      //     <h1 style={{textAlign:"center",marginTop:'100px'}}>Welcome !!</h1>
      //     {regisState.length? regisState[0].user.firstname : ""}

      //   <img src={this.props.regisState.user} />
      // </div>
      <div className="container">
        {regisState.map((obj) =>
          //<div>{obj}</div>)
          <div key={obj.user.id} className="user-info">
            <div className="avatar">
              <img src={obj.user.profileImage} className="welcomeImage" alt="img" width="250px" />
            </div>
            <div className="content">
              <h1>{obj.user.firstname} {" "} {obj.user.lastname}</h1>
              <p>
                <strong>id: </strong>
                {obj.user.id}
              </p>
              <p>
                <strong>Gender:</strong> {obj.user.gender}
              </p>
              <p>
                <strong>Marital status:</strong> {obj.user.maritalStatus}
              </p>
              <p>
                <strong>Username:</strong> {obj.user.username}
              </p>
            </div>
          </div>)}
      </div>




    )
  }
}

const mapStateToProps = (state) => ({

  regisState: state.registration


})
export default connect(mapStateToProps)(Welcome);