import React, { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTimes } from '@fortawesome/free-solid-svg-icons'
import EditBox from './editbox'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PDFExport } from '@progress/kendo-react-pdf';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

class CsvData extends Component {
  constructor(props) {
    super(props);
    this.changedData = this.changedData.bind(this);
    this.handleDownload_pdf=this.handleDownload_pdf.bind(this);
    this.handleDownload_all=this.handleDownload_all.bind(this);
    this.state = {
      editData: [],
      showEditBox: false,
      new:'yeye'
    }
  }
  handleDeleteRow(id, name) {
    // console.log( "delete",id);
    this.props.deleteRow(id, name);
  }

  handleEdit(value) {

    this.setState({
      showEditBox: !this.state.showEditBox,
      editData: value
    });
  }

  changedData(editedData) {
    
    console.log("==changed", editedData);
    this.props.editedData(editedData)
    toast.success('Edited Successfully !');
  }
  handleDownload_pdf(value) {
    console.log('hi',value);
    //this.setState({editData:value})
    this.currentData.save();
  }
  handleDownload_all() {
    this.AllData.save();
  }

  render() {
    // data = Array.from(props.data);
    const tempData = this.props.allData;
     console.log(this.state.editData);
    console.log("welcome========", tempData)

    return (

      <div className="container">
      
      <button className="downloadAllBtn" onClick={this.handleDownload_all}>Download All</button>
      <PDFExport paperSize={'Letter'}
          fileName="student.pdf"
          title="student details"
          keepTogether="button"
          scale={0.6}
          ref={(data) => this.AllData = data}>

        { tempData.map((value) =>

          <div key={value.id} className="user-info">
            <div className="avatar">
              <img src='image/tiger.jpeg' className="profileImage" alt="img" width="250px" />
            </div>
            <PDFExport paperSize={'Letter'}
          fileName="student.pdf"
          title="student details"
          scale={0.6}
          width="300"
          ref={(data) => this.currentData = data}>

            <div className="content">

              <h1>{value.firstname}{" "}{value.lastname}
                 
                    <button name='downloadData' className='downloadBtn' onClick={this.handleDownload_pdf.bind(this,value)}>
                    Download
                    </button>  
                 
                 &nbsp; 
              
                  <button name="removeData" className="removeBtn" onClick={() => window.confirm("Are you sure you wish to delete this item?") && this.handleDeleteRow(value.id, value.firstname)}>
                  Delete
                  {/* {" "}<FontAwesomeIcon icon={faTimes} style={{ color: "red" }} size="1x" /> */}
                 </button>
                
                &nbsp;
                
                  <button name='editData' className='editBtn' onClick={this.handleEdit.bind(this, value)} >Edit</button>
                  &nbsp;
               
              </h1>
            

              <table id="viewCsvData">
                <tbody>
                  <tr>
                    <td><strong>id: </strong>{value.id} </td>
                    <td><strong>College:</strong> {value.college} </td>
                    <td> <strong>Branch:</strong> {value.branch} </td>
                  </tr>
                  <tr>
                    <td><strong>Grade:</strong> {value.grade}</td>
                    <td><strong>Mob:</strong> {value.mobile}</td>

                  </tr>
                  <tr>
                    <td><strong>Email:</strong> {value.email}</td>
                    <td><strong>Hobby:</strong> {value.hobby}</td>
                  </tr>
                </tbody>
              </table>
            </div>
              </PDFExport>
          </div>
        )}

        {this.state.showEditBox ?
          <EditBox
            changedData={this.changedData}
            closePopup={this.handleEdit.bind(this)}
            editData={this.state.editData}
          />
          : null
        }
       
       {/* <PDFExport paperSize={'Letter'}
          fileName="student.pdf"
          title="student details"
          ref={(data) => this.currentData = data}>
          
              <div style={{
                  height: 792,
                  width: 612,
                  padding: 'none',
                  backgroundColor: 'white',
                  margin: 'auto',
                  overflowX: 'hidden',
                  overflowY: 'hidden'}}>
               
                     content
              </div>
       </PDFExport> */}
       </PDFExport>
      </div>




    )
  }
}

export default (CsvData);