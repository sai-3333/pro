//  import React ,{Component} from 'react';


// class Home extends Component{

    
//    render(){       return(
//          <h1>my home page</h1>
//       )       }
  
//  }


//  export default Home
import React, {Component} from 'react';
import {Button} from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import {Dialog} from 'primereact/dialog';
import axios from 'axios';
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';
import {Card} from 'primereact/card';



class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            userData:[],
            selectedRow:[],
            showAddDialog:false,
            id:'',
            fname:'',
            lname:'',
            email:'',
            image:'',
            op:''
        }
        this.loadData();
    }

    loadData = () => {
        
        axios.get('https://reqres.in/api/users?page=1').then((res)=>{
            this.setState({userData:res.data.data,selectedRow:res.data.data[0]})
            console.log(res.data.data);
        })

    }
    addNewRecord = () =>{
       // console.log('adding new record');
        this.setState({showAddDialog:true,op:'ADD',id:'',fname:'',lname:'',email:''})
    }

    saveRecord = () => {
        if(this.state.op='ADD'){
        let a = {
            id: this.state.id,
            first_name: this.state.fname,
            last_name : this.state.lname,
            email: this.state.email,
            avatar:'https://picsum.photos/200/300'


        }
        console.log(this.state.selectedRow)
        for(var i=0; i<this.state.userData.length ; i++){
            if(this.state.userData[i].id == this.state.selectedRow.id){
                break;
            }
        }
        console.log(i);
        this.state.userData.splice(i,0,a);
        this.setState({userData:this.state.userData,showAddDialog:false, selectedRow:a})
    }else{
        for(var i=0; i<this.state.userData.length ; i++){
            if(this.state.userData[i].id == this.state.selectedRow.id){
                this.state.userData[i].id= this.state.id;
                this.state.userData[i].first_name= this.state.fname;
                this.state.userData[i].last_name= this.state.lname;
                this.state.userData[i].email= this.state.email;
                
            }
        }
        this.setState({userData:this.state.userData,showAddDialog:false})
        }
    }
    deleteRecord = () => {
        for(var i=0; i<this.state.userData.length ; i++){
            if(this.state.userData[i].id == this.state.selectedRow.id){
                break;
            }
        }
        this.state.userData.splice(i,1);
        this.setState({userData:this.state.userData,showAddDialog:false})
        if(this.state.userData[i]){
            console.log('record exist');
            this.setState({selectedRow:this.state.userData[i]})
        }else if (this.state.userData[i-1]) {
            console.log('above record doesnot exist');
            this.setState({selectedRow:this.state.userData[i-1]})
        }else{
            this.setState({selectedRow:{}})
            console.log('no record exist')
        }
        console.log("delete record");    
    }
       
    
    addDialogFooter = () => {
        return(
            <div style={{display:'flex',justifyContent:'flex-end'}}>
                <Button label="Save" onClick={()=>this.saveRecord()}/>
                <Button label="Cancel" onClick={()=>{this.setState({showAddDialog:false})}}/>
            </div>
       )
      
    }
    updateRecord = ()=> {
        this.setState( 
            {
            id:this.state.selectedRow.id,
            fname:this.state.selectedRow.first_name,
            lname:this.state.selectedRow.last_name,
            email:this.state.selectedRow.email,
            image:this.state.selectedRow.avatar,
            showAddDialog:true,
            op:'UPD'
             }
        )
            }
    
        
    render(){
        //console.log(this.state.selectedRow);
        return ( 
            <div style={{display:'flex',justifyContent:'center'}}>
            
            <Card style={{width:'800'}}>
            <div style={{display:'flex' , flexDirection:'row',justifyContent:'space-between'}}>
                <h4>UserList</h4>
                <div style={{display:'flex', width:'5'}}> 
                <Button label="new" onClick={()=>{this.addNewRecord()}}/>
                <div style={{display:'flex' ,width:'5'}}> 
                <Button label="delete" onClick={()=>{this.deleteRecord()}}/>
                <div style={{display:'flex', width:'5'}}> 
                <Button label="update" onClick={()=>{this.updateRecord()}}/>
                </div> 
                </div>
                </div>

            </div>
            <DataTable value={this.state.userData} selection={this.state.selectedRow} selectionMode="single" 
            selection={this.state.selectedRow} 
            onSelectionChange={e => this.setState({ selectedRow: e.value })}>
                <Column field="id" header="Id" />
                <Column field="first_name" header="First name" />
                <Column field="last_name" header="Last Name" />
                <Column field="email" header="Email" />
                <Column  body={(rowdata)=><img src={rowdata.avatar} height={40} width={40}/>} header="Image" />
            </DataTable>

            </Card>
            <Dialog  footer={this.addDialogFooter}header="Add New User" visible={this.state.showAddDialog}
             style={{ width: '50vw' }}  onHide={() => {this.setState({showAddDialog:false})}}>
                <InputText value={this.state.id} placeholder="Enter Id" 
                onChange={(e)=>{this.setState({id:e.target.value})}}/>
                <InputText value={this.state.fname} placeholder="Enter First Name"
                 onChange={(e)=>{this.setState({fname:e.target.value})}}/>
                <InputText value={this.state.lname} placeholder="Enter Last Name" 
                onChange={(e)=>{this.setState({lname:e.target.value})}}/>
                <InputText value={this.state.email} placeholder="Enter Email"
                 onChange={(e)=>{this.setState({email:e.target.value})}}/>
                
</Dialog>
            </div>

        
        )
    }
}

export default Home;