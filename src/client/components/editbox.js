import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class EditBox extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        //this.handleGender=this.handleGender.bind(this);

        this.state = {

            userData: {
                id: this.props.editData.id,
                firstname: this.props.editData.firstname,
                lastname: this.props.editData.lastname,
                college: this.props.editData.college,
                branch: this.props.editData.branch,
                grade: this.props.editData.grade,
                hobby: this.props.editData.hobby,
                email: this.props.editData.email,
                mobile: this.props.editData.mobile
            },
            submitted: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        var editedData = this.state.userData;
        // console.log(this.state.userData)
        if (editedData.firstname && editedData.lastname && editedData.email && editedData.college) {
            this.props.changedData(editedData);
            this.props.closePopup();
        }
    }
    handleChange(e) {
        const { name, value } = e.target;
        const { userData } = this.state;
        this.setState({
            userData: {
                ...userData,
                [name]: value
            }
        });

    }

    render() {
        const { submitted } = this.state;
        const { firstname, lastname, email, college, mobile, branch, grade, hobby } = this.state.userData;

        // console.log("hi",this.props.editData);
        return (
            <div className='edit_container' >
                <div className='edit_container_inner'>
                    <h1 style={{ textAlign: 'center' }}>Edit Form</h1>
                    {/* <input type='text' placeholder={this.props.text} /> */}

                    <button className="closeEditBox" onClick={this.props.closePopup}>
                        <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} size="1x" />
                    </button>

                    <div id="editForm" style={{ fontSize: '15px' }} >
                        <form onSubmit={this.handleSubmit} style={{ padding: '16px' }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="fstName"> First Name: </label>
                                            <input type="text" name="firstname" value={firstname} onChange={this.handleChange} />
                                            {submitted && !firstname && <div style={{ fontSize: '12px', color: 'red' }}>first name is required</div>}
                                        </td><td>
                                            <label> Last Name: </label>
                                            <input type="text" name="lastname" value={lastname} placeholder="lastname" onChange={this.handleChange} />
                                            {submitted && !lastname && <div style={{ fontSize: '12px', color: 'red' }}>Last name is required</div>}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label> college: </label>
                                            <input type="text" name="collegename" value={college} placeholder="college" onChange={this.handleChange} />
                                            {submitted && !college && <div style={{ fontSize: '12px', color: 'red' }}>college is required</div>}
                                        </td>
                                        <td>
                                            <label>branch:</label>
                                            <input type="text" name="branch" value={branch} placeholder="branch" onChange={this.handleChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label>grade:</label>
                                            <input type="number" name="grade" value={grade} placeholder="grade" onChange={this.handleChange} />
                                        </td>
                                        <td>
                                            <label>hobby</label>
                                            <input type="text" name="hobby" value={hobby} placeholder="hobby" onChange={this.handleChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label>email: </label>
                                            <input type="email" name="email" value={email} placeholder="email" onChange={this.handleChange} />
                                            {submitted && !email && <div style={{ fontSize: '12px', color: 'red' }}>Email is required</div>}
                                        </td>
                                        <td>
                                            <label>mobile: </label>
                                            <input type="tel" name="collegename" value={mobile} placeholder="mobile" maxLength="10" onChange={this.handleChange} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit" value="Submit" className="submitEditCsvBtn" style={{ color: 'white' }}>Submit</button>


                        </form>


                    </div>

                </div>
            </div>
        );
    }
}

export default EditBox; 