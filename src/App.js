import React, { Component } from 'react';
// import UserProfile from './client/components/profileBoard'
import './App.css';
import {connect} from 'react-redux';
import {  NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
// import CSVReader from 'react-csv-reader'
import CsvData from './client/components/viewCsvData'
import Papa from 'papaparse';
import { userActions } from './client/actions';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { PDFExport } from '@progress/kendo-react-pdf';
//import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

class App extends Component {
  constructor(props) {
    super(props);
   this.handleChoose=this.handleChoose.bind(this);
   this.handleShowData=this.handleShowData.bind(this);
   this.handleSaveData=this.handleSaveData.bind(this);
   this.deleteRow=this.deleteRow.bind(this);
   this.handleEditedData=this.handleEditedData.bind(this);
   this.handleRemoveAll=this.handleRemoveAll.bind(this);
   
   
    this.state = {
         datas:[],
         show:'',
         msg:'',
         saved:false
    }
   
  }
  handleChoose(e) {
      var data=e.target.files[0];
      console.log(data);
      if(data.type ==='text/csv') {
       var new_data;
       Papa.parse(data, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
        //let flag=1;
        new_data = results.data;
       var fixedColumn=['branch','college','email','firstname','grade','graduation year','hobby','id','lastname','mobile']
        var fileColumn=results.meta.fields.sort();
        // console.log(fileColumn);
        for (var i = 0; i < fileColumn.length - 1; i++) {
          if (fileColumn[i + 1] === fileColumn[i]) {
              var msg= fileColumn[i] 
              this.setState({msg:msg+' '+'column is duplicated!'})
              return;
          }
      }
      if(fixedColumn.length === fileColumn.length) {
        for(i=0; i < fixedColumn.length ; i++) {
    
          if(fileColumn[i] !== fixedColumn[i]) {
                msg=fixedColumn[i] +' '+'is missing or incorrect name';
               this.setState({msg:msg});
               //flag=0;
               return;
          }
        }
      }
      else {
        this.setState({msg:'number of columns mismatched or empty file chosen.'});
        return;
      }

        if(new_data.length)
        {this.setState({datas:new_data,msg:''})}
        else
        {this.setState({msg:'file is empty or no row in file'})}
      }.bind(this)
    })
  }
  else {
    this.setState({msg:'choose only text/csv file type'});
  }
  }
  handleShowData() {
      if(this.state.datas.length)
        this.setState({show:true})
        else
         {
           let msg='no file chosen';
           this.setState({msg:msg})
         }
  }
  handleSaveData(e) {
    e.preventDefault();
    
    var data=this.state.datas;
    console.log(data.length)
    const { dispatch } = this.props;
    if(data.length) {
      this.setState({saved:true});
      dispatch(userActions.save_csv_data(data));
      toast.success('Data saved in Database');
    // console.log('in state',data);
    }
    else {
      toast.error('No data available to be Saved.')
    }
  }
  deleteRow(id,name) {
    console.log(id);
    const dataId ={id:id};
    const { dispatch } = this.props;
     const list = [...this.state.datas];
    const updatedList = list.filter(item => item.id !== id);

    dispatch(userActions.delete_csv_record(dataId));
    
    this.setState({ datas: updatedList });
    // alert(name +" " +'deleted successfully');
    toast.error(name + '  deleted Successfully !');


  }
  handleEditedData(editedData) {
    var datas=this.state.datas;
    var id=editedData.id;
    let flag=0;
    console.log("in app",editedData,datas);
    for(var i=0;i<datas.length;i++) {
           if(id === datas[i].id) {
          
            let copyData=[...datas];
            
             copyData.splice(i,1,editedData)
             console.log('ho gya change',copyData)
             this.setState({datas:copyData})

             flag=1;
             return;
           }
           
    }
   
    if(!flag) {
      console.log('no such id available');
    }

  }
  
  handleRemoveAll() {
    const list =[...this.state.datas];
    list.splice(0);
    this.setState({datas:list});
    toast.error('All data Deleted');
  }
  
    render() {
         const data=this.state.datas;
        //  console.log("-===",data);
        const {alert} =this.props;
        // console.log("app.js",alert.message)
      return (

        // <div className="App">
        //  <UserProfile />
        //  </div>
        <div>
           <ToastContainer autoClose={2000} position='top-center'  />
          <div className="nav-bar">

            <NavLink className="AppHome" activeclassname="active" to="/" style={{ textDecoration: 'none' }}>Home</NavLink>
            <div className="log-reg">
              <NavLink activeclassname="active" to="/login" style={{ textDecoration: 'none', fontSize: '20px' }}>Login {" "}
                <FontAwesomeIcon icon={faSignInAlt} /> |</NavLink>

              {" "}
              <NavLink activeclassname="active" to="/signup" style={{ textDecoration: 'none', fontSize: '20px' }}>
                Register {" "}
                <FontAwesomeIcon icon={faUserPlus} />
              </NavLink>
              <NavLink to="/welcome"></NavLink>
            </div>
          </div>
          <div className="home-content">
            show something on homepage...
           
        
          <div className="csv-container">
          {/* <CSVReader
            cssClass="react-csv-input"
            label="Select CSV "
            onFileLoaded={this.handleChoose.bind(this)}
           /> */}
           <label id="chooseFile">Choose your file
           <input type="file" name="csvfiles" accept=".csv" onChange={this.handleChoose.bind(this)}/>
           </label>
           &nbsp; <button className="showDataBtn" onClick={this.handleShowData}>Show Data</button>
          &nbsp; 
          {this.state.saved ?  <button className="removeAllBtn" onClick={this.handleRemoveAll}>Delete All</button>
          : <button className="saveDataBtn" onClick={this.handleSaveData}>Save Data in database</button> }
           
          
          <p>{this.state.msg}</p>
          <h2>{alert.message}</h2>
        </div>
     
      <div>
     
      {this.state.show ? <CsvData allData={data} deleteRow={this.deleteRow} editedData={this.handleEditedData}/> : "" }
      </div>
      {/* <PDFExport paperSize={'Letter'}
          fileName="student.pdf"
          title="student details"
          ref={(data) => this.AllData = data}>
          
              {/* <div style={{
                  height: 792,
                  width: 612,
                  padding: 'none',
                  backgroundColor: 'white',
                  margin: 'auto',
                  overflowX: 'hidden',
                  overflowY: 'hidden'}}> */}
                {/* <Grid
                        style={{ maxHeight: '400px' }}
                        data={data} >

                        <Column field="id" title="ID" width="40px" />
                        <Column field="firstname" title="Name" width="250px" />
                        <Column field="college" title="collegeName" />
                        <Column field="grade" title="grade" width="80px" />
                        <Column field="email" title="Email" width="80px" />
                    </Grid> */}
                     
              {/* </div> */}
       {/* </PDFExport> */} 
            
    </div>
    
        </div>


      );
    }
  }

  const mapStateToProps= (state) => ({
    alert:state.alert 
})

  export default connect(mapStateToProps)(App);
