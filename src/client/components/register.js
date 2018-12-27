import React, { Component } from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUser, faKey} from '@fortawesome/free-solid-svg-icons'
import { userActions } from '../actions';
import './register.css'

class registerPage extends Component {
   constructor(props) {
       super(props);
       this.handleSubmit=this.handleSubmit.bind(this);
       this.handleCancel=this.handleCancel.bind(this);
       this.handleChange=this.handleChange.bind(this);
       //this.handleGender=this.handleGender.bind(this);
       this.fileChangedHandler=this.fileChangedHandler.bind(this);
       this.state = {
        user: {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            selectedMarital:'',
            selectedGender:'Male',
            selectedProfile:''
        },
        submitted: false
    };
   }
  
   handleSubmit(e) {
       e.preventDefault();
       this.setState({submitted:true});
       //console.log(this.state.user)
       //console.log(this.props)
       const { user } = this.state;
       const { dispatch } = this.props;
       if (user.firstName && user.lastName && user.userName && user.password) {
           dispatch(userActions.thunk_action_creator(user));
           this.props.history.push('/login');
       }
       
   }

//    handleGender(e) {
//        console.log(e.target.value)
//       this.setState({selectedGender:e.target.value});
//    } 
   fileChangedHandler(e) {
       //console.log(e.target.files[0])
       const {user} =this.state;
      this.setState({ 
          user:{...user,selectedProfile:URL.createObjectURL(e.target.files[0])}})
   }
   handleCancel() {
       //console.log(this.state)
       //console.log('cancel')
       this.props.history.push('/');
   }

   handleChange(e) {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
        user: {
            ...user,
            [name]: value
        }
    });
}

  render() {
    const { alert } = this.props;
      const{submitted} =this.state;
      const{firstName,lastName,userName,password} =this.state.user;
    return (
    <div className="register-wrapper"> 
    <div className="reg-app">
       
        <span>{alert.message}</span>
        <div style={{marginTop:'-36.5px',height:'80px',backgroundColor:'rgb(148, 124, 231)',width:'455px',marginLeft:'-9.9px'}}>
          <h4 style={{ padding:'33px', color: 'white',fontSize:'20px' }}>Registration Form</h4>
          </div>
         
      <div id="register" style={{fontSize:'15px'}} >
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="firstName" placeholder="firstname" onChange={this.handleChange}/>
        <FontAwesomeIcon icon={faUser} style={{marginLeft:"-25px",color:"#a2a3a5"}} size="1x"  />
        {submitted && !firstName && <div style={{fontSize:'12px',color:'red'}}>first name is required</div>}
        <br /> 
        {/* <label> Last Name: </label> */}
        <input type="text" name="lastName" placeholder="lastname" onChange={this.handleChange}/>
        {submitted && !lastName && <div style={{fontSize:'12px',color:'red'}}>Last name is required</div>}
        <br /> 
        {/* <label> Username: </label> */}
        <input type="text" name="userName" placeholder="username" onChange={this.handleChange}/>
        {submitted && !userName && <div style={{fontSize:'12px',color:'red'}}>Username is required</div>}
        <br /> 
        <label>Gender:</label>{" "}
        <select onChange={this.handleChange}>
            <option >Male</option>
            <option>Female</option>
            <option>Other</option>
        </select>
         <br /> <br />
         <label>Marital Status:</label>{" "} 
         
         <input type="radio" name="selectedMarital" value="Married" checked={this.state.user.selectedMarital === 'Married'} onChange={this.handleChange}/>
         <span>Married</span>
         <input type="radio" name="selectedMarital" value="Unmarried" checked={this.state.user.selectedMarital === 'Unmarried'} onChange={this.handleChange}/>
         <span>Unmarried</span>
         

         <br /> <br />
         <label>Upload Profile image</label>
         <input type="file" accept="image/*" onChange={this.fileChangedHandler} />
         {/* <button onClick={this.uploadHandler}>Upload!</button> */}
          
         <br /> <br />
        {/* <label>Password: </label> */}
        <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
        <FontAwesomeIcon icon={faKey} style={{marginLeft:"-25px",color:"#a2a3a5"}} size="1x"  />
        {submitted && !password && <div style={{fontSize:'12px',color:'red'}}>password is required</div>}
        <br />
        <button type="submit" value="Submit" className="button submitBtn" >Submit</button>
        {" "}
        <span ><button type="button" className="button cancelbtn" onClick={this.handleCancel}>Cancel</button></span>
        </form>
        {/* <img src={this.state.user.selectedProfile} alt="" /> */}
        
      </div>
      
      </div>
      </div> 
      
    );
  }
}

const mapStateToProps= (state) => ({
    alert:state.alert,
   regisState: state.registration
   
})

 

export default connect(mapStateToProps)(registerPage);
